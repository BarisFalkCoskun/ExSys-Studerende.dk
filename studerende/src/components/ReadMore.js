import React, { useState } from "react";
import "../App.css";

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
	    setIsReadMore(!isReadMore);
    };
    const shortText = <span className={"read-or-hide"}><span className={"line-clamp"}>{text}</span>Read more</span>
    const fullText = <p className={"message"}>{text}</p>
    return (
        <span onClick={toggleReadMore}>
        {isReadMore ? shortText : fullText }
        </span>
    );
};

export default ReadMore;
