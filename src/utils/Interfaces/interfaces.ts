export interface IButton {
    text: string;
    type?: "primary" | "focused";
    disabled?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void | (() => void);
    className?: string;
    removePercentage?: boolean
}