import React from 'react';
import s from './Post.module.scss';
import Image from './../Image/Image';
import { TiHeartFullOutline } from 'react-icons/ti';
import { FaRegComment } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';


export default class Post extends React.Component{
    
    lightenDarkenColor = (color, percent) => {
        var num = parseInt(color.replace("#",""),16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
    };

    state = {
        liked: false
    }

    toggleLike = () => {
        const {
            likeCallback = () => {}, 
            disLikeCallback = () => {}
        } = this.props;

        this.setState((prevState) => {
            return{
                liked: !prevState.liked
            }
        }, () => {
            const { liked } = this.state;
            liked?likeCallback():disLikeCallback()
        })
    }
 
    returnStyle = () => {
        const { color = '#ff8000' } = this.props;
        return{
            backgroundImage: `linear-gradient(to right, ${color}, ${this.lightenDarkenColor(color, -10)})`,
            color: `${this.lightenDarkenColor(color, 45)}`,
        }
    }

    returnImageStyle = () => {
        const { postURL } = this.props;
        const style = postURL 
            ?
        {
            ...this.returnStyle(),
            backgroundImage: `url(${postURL})`
        }
            :
        {
            ...this.returnStyle()
        }
        return style;
    }
    
    render(){
        const { liked } = this.state;
        const {
            post, 
            user='Captain Anonymous',
            username=`@anonymous${Math.floor(Math.random()*100)}`,
            caption,
            shareCallback = () => {},
            commentCallback = () => {},
            imageURL,
            postURL,
            cardStyle = {}
        } = this.props;
        return(
            <React.Fragment>
                <div style={cardStyle} className={s.container}>
                    <div className={s.container_pic}>
                        <Image name = {user} imageURL={imageURL} />
                    </div>
                    <div className={s.container_main}>
                        <div className={s.container_main_initials}>
                            <span className={s.container_main_initials_name}>{user}</span>
                            <span className={s.container_main_initials_username}>{username}</span>
                            <div className={s.container_main_initials_caption}>{caption}</div>
                        </div>
                        <div className={s.container_main_content} style={this.returnImageStyle()}>
                            <span className={s.container_main_content_text}>{!postURL?post:''}</span>
                        </div>
                        <div className={s.container_main_stats}>
                            <div onClick = {this.toggleLike} className={s.container_main_stats_item}>
                                <TiHeartFullOutline className={!liked?s.container_main_stats_item:s.like} />
                            </div>
                            <div onClick={commentCallback} className={s.container_main_stats_item}><FaRegComment /></div>
                            <div onClick={shareCallback} className={s.container_main_stats_item}><FiShare /></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}