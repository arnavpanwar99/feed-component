import React from 'react';
import s from './Image.module.scss';

class Image extends React.Component{
    render(){
        const { imageURL, name } = this.props;
        const initials = name && `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        return(
            <>
                {
                    imageURL
                        ?
                    <img src={imageURL} className={s.image}></img>
                        :
                    <div className={s.name}>
                        <span className={s.name_initials}>{initials}</span>
                    </div>
                }
            </>
        )
    }
}

export default Image;