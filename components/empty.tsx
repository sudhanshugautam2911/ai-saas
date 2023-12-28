import Image from "next/image";

interface EmptyProp {
    label: string;
}

export const Empty = ({
    label
}: EmptyProp) => {
    return (
        <div className="h-full p-20 flex flex-col justify-center items-center">
            <div className="relative h-72 w-72">
                <Image
                    alt="Empty"
                    fill
                    src="/empty.png"
                />
            </div>
            <p className="text-sm text-muted-foreground text-center">
                {label}
            </p>
        </div>
    );
}
