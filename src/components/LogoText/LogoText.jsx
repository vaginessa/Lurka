import './LogoText.styles'
import React from 'react'
import {name, version} from "Lurka/package.json"


export default () => {
    return <div className="LogoText">
        <div className="center-content">
            <div className="name">{name}</div>
            <div className="version">v{version}</div>
        </div>
    </div>
}
