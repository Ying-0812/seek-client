import React from 'react'
import { GithubFilled, FacebookFilled, ChromeFilled } from '@ant-design/icons';
function Footer() {

    return (
        <>
            <div className="navFooter">
                <div>
                    <span>友情链接:&emsp;</span>
                    <a rel="noreferrer" href='https://github.com/' target="_blank"><GithubFilled />&nbsp;GitHub</a>
                    <a rel="noreferrer" href='https://www.google.com/' target="_blank" className='centerMargin'><ChromeFilled />&nbsp;Google</a>
                    <a rel="noreferrer" href='https://www.facebook.com/' target="_blank"><FacebookFilled />&nbsp;FacBook</a>
                </div>
                <div>
                    <p className='p1'>@2022 Individual Project For React </p>
                    <p className='p2'>Powered By Create-React-App</p>
                </div>
            </div>
        </>
    )
}

export default Footer