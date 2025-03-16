import { FC, ReactNode } from "react"

export enum ButtonStyle {
    RED,
    BLUE
}

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    style: ButtonStyle;
};


const Button: FC<ButtonProps> = ({ children, onClick, style }) => {

    function getButtonStyle(style: ButtonStyle) {
        switch (style) {
            case ButtonStyle.RED:
                return "bg-red-500 hover:bg-red-400 active:bg-red-600";
            case ButtonStyle.BLUE:
                return "bg-blue-500 hover:bg-blue-400 active:bg-blue-600";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <button
            className={`size-[32px] rounded-[99px] ${getButtonStyle(style)}`}
            onClick={onClick}
        >
            <div className="text-white flex items-center justify-center">{children}</div>
        </button>
    )
};

export default Button;
