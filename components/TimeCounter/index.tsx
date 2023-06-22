import Timer from "react-compound-timer";
import cn from "classnames";
import styles from "./TimeCounter.module.sass";

type TimeCounterProps = {
    className?: string;
    classTimerItem?: string;
    classTimerValue?: string;
    classTimerText?: string;
    time: any;
    abbreviated?: boolean;
};

const TimeCounter = ({
    className,
    classTimerItem,
    classTimerValue,
    classTimerText,
    time,
    abbreviated,
}: TimeCounterProps) => (
    <div className={cn(styles.timer, className)}>
        <Timer
            initialTime={time * 60 * 60000}
            direction="backward"
            formatValue={(value) =>
                `${value < 10 ? `0${value}` : value} units `
            }
        >
            {() => (
                <>
                    <div className={cn(styles.item, classTimerItem)}>
                        <span
                            className={cn("h3", styles.value, classTimerValue)}
                        >
                            <Timer.Hours
                                formatValue={(value) =>
                                    `${
                                        value < 1
                                            ? ``
                                            : value < 10
                                            ? `0${value}`
                                            : `${value}`
                                    }`
                                }
                            />
                        </span>
                        <span className={cn(styles.text, classTimerText)}>
                            {abbreviated ? (
                                "h"
                            ) : (
                                <>
                                    <span>hours</span>
                                    <span>hrs</span>
                                </>
                            )}
                        </span>
                    </div>
                    <div className={cn(styles.item, classTimerItem)}>
                        <span
                            className={cn("h3", styles.value, classTimerValue)}
                        >
                            <Timer.Minutes
                                formatValue={(value) =>
                                    `${value < 10 ? `0${value}` : `${value}`}`
                                }
                            />
                        </span>
                        <span className={cn(styles.text, classTimerText)}>
                            {abbreviated ? (
                                "m"
                            ) : (
                                <>
                                    <span>minutes</span>
                                    <span>min</span>
                                </>
                            )}
                        </span>
                    </div>
                    <div className={cn(styles.item, classTimerItem)}>
                        <span
                            className={cn("h3", styles.value, classTimerValue)}
                        >
                            <Timer.Seconds
                                formatValue={(value) =>
                                    `${value < 10 ? `0${value}` : value}`
                                }
                            />
                        </span>
                        <span className={cn(styles.text, classTimerText)}>
                            {abbreviated ? (
                                "s"
                            ) : (
                                <>
                                    <span>seconds</span>
                                    <span>sec</span>
                                </>
                            )}
                        </span>
                    </div>
                </>
            )}
        </Timer>
    </div>
);

export default TimeCounter;
