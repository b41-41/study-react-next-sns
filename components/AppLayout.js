import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => {
    return (
        <div>
            <Link href="/"><a>INDEX</a></Link>
            <Link href="/profile"><a>프로필</a></Link>
            <Link href="/signup"><a>회원가입</a></Link>
            <div>공통 메뉴</div>
            { children }
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
