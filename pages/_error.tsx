import Layout from "@/components/Layout";
import cn from "classnames";
import styles from "@/components/Congrats/Congrats.module.sass";
import Image from "@/components/Image";
import React, { ErrorInfo } from "react";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error boundary caught an error:", error);
    console.error("Error boundary error info:", errorInfo);
    this.setState({ errorInfo });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <Layout layoutNoOverflow footerHide noRegistration>
          <div className={styles.congrats}>
            <div className={styles.wrapper}>
              <div className={cn(styles.inner, "flex flex-col gap-8")}>
                <div className={styles.preview}>
                  <div className={styles.image}>
                    <Image
                      src="/images/error.png"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                      alt="Avatar"
                    />
                  </div>
                  <div className={styles.polygon}>
                    <div className={styles.background}>
                      <svg width="0" height="0" style={{ display: "block" }}>
                        <clipPath
                          id="polygon"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path d="M0.56734176,0.00289554786 C0.588460408,-0.00379357421 0.611542883,0.00129193347 0.627894867,0.016236395 L0.958957144,0.318801867 C0.975311066,0.333746135 0.982451374,0.356279281 0.97768471,0.37791238 L0.881186884,0.815905858 C0.87642022,0.837539926 0.860475146,0.854986693 0.839356498,0.861676493 L0.411795427,0.997104015 C0.390676779,1.00379382 0.367594303,0.998708404 0.35124232,0.983763168 L0.020177136,0.68119818 C0.00382466766,0.666253913 -0.00331254023,0.643720766 0.00145363969,0.622087667 L0.0979503025,0.184093898 C0.102716967,0.162460315 0.11866204,0.145012773 0.139780689,0.138323651 L0.56734176,0.00289554786 Z" />
                        </clipPath>
                      </svg>
                    </div>
                  </div>
                  {/* <div className={styles.confetti}>
            <Image
              src="/images/confetti.png"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              alt="Avatar"
            />
          </div> */}
                </div>
                <div className={styles.details} style={{ marginTop: "20px" }}>
                  <div className={cn("h3", styles.title)}>
                    Something went wrong.
                  </div>
                  <Link href={`/help`}>
                    <a className={cn("button-large", styles.button)}>
                      contact support
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
