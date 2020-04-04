import React, {Fragment} from "react";
import {
    Container, Row, Col,Button
} from "react-bootstrap";
import Request from "../utils/Request"
import Loader from "./Loader"
import InfiniteScroll from "react-infinite-scroll-component";

export default class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            page: 1,
            title_box: "",
            comment_box: "",
            default: {
                _links: {
                    avatar: {
                        href: "https://randomuser.me/api/portraits/thumb/men/28.jpg"
                    }
                },
                first_name: "Daniel",
                last_name: "Aguirre",
                dob: "1995-03-28",
                email: "daniel.aguirre.dev@gmail.com",
            },
            goRest_id: "12114"
        }
        this.posts()
    }

    posts(){
        var me = this.state
        Request.getJSON("/posts?page="+me.page).then(async(datos)=>{
            let data = datos.result;
            this.setState({
                items: me.items.concat(data),
                page: me.page+1
            });
            this.user()
        })
    }

    user(){
        var me = this.state
        var posts = me.items
        for (let i = 0; i < posts.length; i++) {
            const elements = posts[i];
            if (typeof(elements.user_id)=="string") {
                Request.getJSON("/users/"+elements.user_id).then((info_user, err)=>{
                    info_user.result._links.avatar.href = "https://randomuser.me/api/portraits/thumb/men/"+i+".jpg"
                    if (info_user.result.id === elements.user_id) {
                        posts[i].user_id = info_user.result
                        this.setState(posts[i])
                    }
                })   
            }
        }
    }

    handleChange(key, event){
        var obj = {}
        obj[key] = event.target.value;
		this.setState(obj);
    }

    fetchMoreData = () => {
        setTimeout(() => {
            this.posts()
        }, 500);
    };

    sendData() {
        var me = this.state
        var data = {
            title: me.title_box,
            body: me.comment_box,
            user_id: me.goRest_id
        }
        Request.postJSON("/posts", data).then((posts, err)=>{
            if (err) {
                console.log("err", err)
            }
            else{
                /* 
                    * En proceso ya que los datos quedan en la última página
                    * de las más de 4.000 que hay en la api.
                    * Se puede comprobar que el comentario queda, poniendo el id.
                */

                // var newPost = posts.result
                // Request.getJSON("/users/"+newPost.user_id).then((info_user, err)=>{
                //     info_user.result._links.avatar.href = "https://randomuser.me/api/portraits/thumb/men/"+me.page+".jpg"
                //     console.log("info_user", info_user)
                //     newPost.user_id = info_user.result
                //     if (newPost.id) {
                //         this.setState({
                //             items: me.items.unshift(newPost),
                //         });
                //     }
                // })
            }
        });
    }

    render() {
        var me = this.state
        return(
            <Fragment>
                <Container className="gk-container">
                   <div>
                   <hr />
                    <Row>
                        <Col lg={4} md={2} >
                        <div id="form" className="clearfix">
                            <input type="text" id="title-box" value={me.title_box} placeholder="Title" onChange={this.handleChange.bind(this,'title_box')} />
                            <textarea name="" id="comment-box" value={me.comment_box} placeholder="Leave a comment" onChange={this.handleChange.bind(this,'comment_box')} ></textarea>
                            <span style={{color:"#fff"}}>user id: {me.goRest_id}</span>
                            <Button variant="success" id="btn" onClick={this.sendData.bind(this)} >Submit</Button>
                        </div>
                        </Col>
                        <Col lg={8} md={10}>
                        <InfiniteScroll
                    dataLength={me.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<Loader/>}
                    >
                    {
                        me.items.length!==0?(
                            me.items.map((items, ind) => {
                                var user = typeof(items.user_id)!="string"?(items.user_id):(me.default);
                                return(
                                    <div className="comments-section" key={ind}>
                                        <div className="comments">
                                            <div id="comments-container">
                                                <div className="comment">
                                                    <div className="comment-user">
                                                        <div className="avatar">
                                                        <img src={user._links.avatar.href} alt={user.first_name} />
                                                        </div>
                                                            <span className="user-details">
                                                                <span className="username">{user.first_name + user.last_name} </span>
                                                                <span>on </span><span>{user.dob}</span>
                                                            </span>
                                                    </div>
                                                    <div className="comment-text"> 
                                                    <p>{items.title}</p>
                                                    <p>{items.body}</p>
                                                    <br/><br/>
                                                    <a href={"mailto:"+user.email}>{user.email}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ):(
                            <div>
                                No hay datos para mostrar
                            </div>
                        )
                    }
                    </InfiniteScroll>
                        </Col>
                    </Row>

                   </div>
                </Container>
            </Fragment>
            );
    }
}