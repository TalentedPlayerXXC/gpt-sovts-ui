import React, { useEffect, useState } from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LogoWhite from '../assets/fangxiu_Logo_white.png'
import LogoBlack from '../assets/fangxiu_Logo_black.png'
// import LogoBlack from '../assets/logo_black.png'
// import logoImg from '../assets/fangxiu_Logo_black.png';

import './index.css'
function LoginComp(props: any) {
    const { theme, user='w' } = props;
    return (
        <div className='loginHead'>
            <div className='logo'>
                <img src={theme === "dark" ? LogoBlack : LogoWhite} alt="white_logo" />
            </div>
            <div>
                {
                    user ?
                        <>
                            <Avatar size={44} style={{ backgroundColor: '#131413ff', fontSize: '16px' }} src={LogoWhite} />
                             {/* <Avatar size={44} icon={<UserOutlined />} /> */}
                        </>
                        : "请登录"
                }
            </div>
        </div>
    );
}
export default LoginComp;
// })
