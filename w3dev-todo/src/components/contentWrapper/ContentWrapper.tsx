import React, {ReactNode} from "react";

import "./style.css";

const ContentWrapper: React.FC<{children : ReactNode}> = ({children}) => {
	return <div className='contentWrapper'>{children}</div>
}

export default ContentWrapper;
