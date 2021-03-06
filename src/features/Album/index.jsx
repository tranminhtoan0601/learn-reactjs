import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './component/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {
    const albumList = [
        {
            id:1,
            name:'Nhac Hoa Thinh Hanh',
            thumbnailUrl:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/4/e/7/f4e7ea36ae561ef14e56852cf98c4231.jpg'
        },

        {
            id:2,
            name:'Rap Viet Nghe La Ghien',
            thumbnailUrl:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/d/7/c/e/d7ce91987c682ced4f3bdb2a974d7f07.jpg'
        },

        {
            id:3,
            name:'Trao Luu Nhac Hot',
            thumbnailUrl:'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/3/2/7/f32706deea40fb7ae2d8ff35650c5d86.jpg'
        },
    ];
    return (
        <div>
            <h2> Có Lẽ bạn sẽ thích đấy</h2>
            <AlbumList albumList={albumList}/>
        </div>
    );
}

export default AlbumFeature;