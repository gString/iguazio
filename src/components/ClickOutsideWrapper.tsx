
import {useRef, useEffect, ReactElement} from 'react';

interface Props {
    children: ReactElement;
    onClick: (e: MouseEvent) => void;
}

export default function ClickOutsideWrapper({ children, onClick }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickListener = (event: MouseEvent):void => {

        const clickedInside = (wrapperRef && wrapperRef.current!.contains(event.target as HTMLElement));

        if (clickedInside) return;
        else {
            // event.preventDefault();
            onClick(event);
        }
    }


    useEffect(() => {
        document.addEventListener('mousedown', handleClickListener);

        return () => {
            document.removeEventListener('mousedown', handleClickListener);
        };
    }, []);

    return (
        <div ref={wrapperRef}>
            {children}
        </div>
    );
}