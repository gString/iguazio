import {useRef, useEffect, ReactElement, useCallback} from 'react';

interface Props {
    children: ReactElement;
    onClick: (e: MouseEvent) => void;
}

export default function ClickOutsideWrapper({ children, onClick }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickListener = useCallback((event: MouseEvent):void => {
        const clickedInside = (wrapperRef && wrapperRef.current!.contains(event.target as HTMLElement));
        if (clickedInside) return;
        else {
            onClick(event);
        }
    }, [onClick])


    useEffect(() => {
        document.addEventListener('mousedown', handleClickListener);

        return () => {
            document.removeEventListener('mousedown', handleClickListener);
        };
    }, [handleClickListener]);

    return (
        <div ref={wrapperRef}>
            {children}
        </div>
    );
}