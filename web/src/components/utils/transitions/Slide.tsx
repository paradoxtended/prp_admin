import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  in?: boolean;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const Slide: React.FC<Props> = (props) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition in={props.in} nodeRef={nodeRef} classNames="transition-slide" timeout={200} unmountOnExit>
            {React.cloneElement(props.children, { ref: nodeRef })}
        </CSSTransition>
    )
};

export default Slide;