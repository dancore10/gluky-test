import React, { Fragment } from "react";
import {
    Container
} from "react-bootstrap";
import Request from "../utils/Request"
import Loader from "./Loader"
import InfiniteScroll from "react-infinite-scroll-component";

export default class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            page: 1
        }
        this.photos()
    }

    photos(){
        var me = this.state
        Request.getJSON("/photos?page="+me.page).then((datos)=>{
            this.setState({
                items: me.items.concat(datos.result),
                page: me.page+1
            })
        })
    }

    fetchMoreData = () => {
        setTimeout(() => {
            this.photos()
        }, 500);
    };

    render() {
        var me = this.state
        return(
            <Fragment>
                <Container className="gk-container">
                    <hr />
                    <InfiniteScroll
                    dataLength={me.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<Loader/>}
                    >
                        <ul className="cards">
                    {
                        me.items.length!==0?(
                            me.items.map((items, ind) => {
                                return(
                                    <li className="cards__item" key={ind}>
                                        <div className="card">
                                            <img className="card__image" src={items.thumbnail || "https://picsum.photos/id/"+ind+"/200/300"} alt="al"/>
                                        <div className="card__content">
                                            <div className="card__title">Album ID: {items.album_id}</div>
                                            <p className="card__text">
                                                {items.title}
                                            </p>
                                        </div>
                                        </div>
                                    </li>
                                )
                            })
                        ):(
                            <div>
                                No hay datos para mostrar
                            </div>
                        )
                    }
                    </ul>
                    </InfiniteScroll>
                </Container>
            </Fragment>
            );
    }
}