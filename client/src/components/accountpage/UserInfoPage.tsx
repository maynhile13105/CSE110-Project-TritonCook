import React from "react";
import { Link } from "react-router-dom";
import "./UserInfoPage.css";

const UserInfoPage = () => {
    const userInfoData = [
        { label: "Username", info: "Example1" },
        { label: "Password", info: "*****" },
        { label: "Email", info: "students@ucsd.edu" },
        { label: "DOB", info: "MM/DD/YYYY" },
        { label: "Ethic", info: "Asian/Asian American" },
        { label: "Phone", info: "+1(123)-456-7890" },
    ];

    return (
        <div className="page_style">
            {/* Center Top Button */}
            <button className="styled-button">
                <Link to="/home/edit" className="edit-text">
                    Change Info
                    <div className="edit-icon">
                    <svg fill="#000000" width="30px" height="30px" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin"><path d='M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z'/></svg>
                    </div>
                </Link>
            </button>

            <div className="page-container">
                <div className="button-container">
                    <div className="button">
                        {/* <span className="button-text">Information</span> */}
                        <Link to="/home/info" className="button-text">Information</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="52" viewBox="0 0 49 52" fill="none">
                        <path d="M24.5002 8.125C20.2717 8.125 16.8439 11.7627 16.8439 16.25C16.8439 20.7373 20.2717 24.375 24.5002 24.375C28.7286 24.375 32.1564 20.7373 32.1564 16.25C32.1564 11.7627 28.7286 8.125 24.5002 8.125Z" fill="black"/>
                        <path d="M16.3335 28.7083C12.1051 28.7083 8.67725 32.346 8.67725 36.8333V39.4079C8.67725 41.0399 9.79176 42.4315 11.3095 42.6944C20.0454 44.208 28.9549 44.208 37.6908 42.6944C39.2086 42.4315 40.3231 41.0399 40.3231 39.4079V36.8333C40.3231 32.346 36.8953 28.7083 32.6668 28.7083H31.9709C31.5942 28.7083 31.2199 28.7715 30.8618 28.8956L29.0948 29.508C26.1093 30.5425 22.8911 30.5425 19.9056 29.508L18.1385 28.8956C17.7804 28.7715 17.4061 28.7083 17.0294 28.7083H16.3335Z" fill="black"/>
                        </svg>
                    </div>
                    <div className="button">
                        {/* <span className="button-text">Posts</span> */}
                        <Link to="/home/profile" className="button-text">Posts</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="31" viewBox="0 0 28 31" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9375 0.854166C17.9375 0.641307 17.7416 0.46875 17.5 0.46875H5.25C2.59213 0.46875 0.4375 2.36688 0.4375 4.70833V26.2917C0.4375 28.6331 2.59213 30.5312 5.25 30.5312H22.75C25.4079 30.5312 27.5625 28.6331 27.5625 26.2917V11.1017C27.5625 10.8889 27.3666 10.7163 27.125 10.7163H19.25C18.5251 10.7163 17.9375 10.1986 17.9375 9.56005V0.854166ZM19.25 15.8854C19.9749 15.8854 20.5625 16.4031 20.5625 17.0417C20.5625 17.6802 19.9749 18.1979 19.25 18.1979H8.75C8.02513 18.1979 7.4375 17.6802 7.4375 17.0417C7.4375 16.4031 8.02513 15.8854 8.75 15.8854H19.25ZM19.25 22.0521C19.9749 22.0521 20.5625 22.5698 20.5625 23.2083C20.5625 23.8469 19.9749 24.3646 19.25 24.3646H8.75C8.02513 24.3646 7.4375 23.8469 7.4375 23.2083C7.4375 22.5698 8.02513 22.0521 8.75 22.0521H19.25Z" fill="black"/>
                        <path d="M20.5625 1.35388C20.5625 1.06944 20.8996 0.888847 21.1508 1.06751C21.3624 1.218 21.5526 1.3943 21.7149 1.59347L26.9879 8.06523C27.108 8.21257 26.978 8.4038 26.7721 8.4038H21C20.7584 8.4038 20.5625 8.23124 20.5625 8.01838V1.35388Z" fill="black"/>
                        </svg>
                    </div>
                    <div className="button">
                        {/* <span className="button-text">Friends</span> */}
                        <Link to="/home/friends" className="button-text">Friends</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="40" viewBox="0 0 45 40" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2302 25.5061C14.767 25.5061 16.0093 25.7093 17.283 26.1228L17.7628 26.2877C18.4332 26.5306 18.8134 27.3829 18.612 28.1913C18.5792 28.323 18.5319 28.4484 18.4715 28.5643L18.3393 28.7774C17.1263 30.5681 16.346 32.5359 15.7902 34.8358L15.6434 35.489L15.5738 35.8766C15.4984 36.4055 15.473 36.7784 15.473 37.1519C15.473 37.3615 15.4809 37.5688 15.4962 37.7736L15.5247 38.0788C15.629 39.0056 15.0904 39.859 14.3218 39.9847C14.2591 39.9949 14.196 40.0001 14.1328 40.0001L2.36025 39.9981C1.05672 39.998 0 38.7238 0 37.1519C0 36.9962 0.0105975 36.8408 0.031633 36.6875L0.0709949 36.4591C1.38073 30.166 6.2957 25.5061 13.2302 25.5061ZM32.0082 25.506C38.7886 25.506 43.6092 29.8311 44.8711 36.1912L44.9516 36.628C45.2111 38.1444 44.4021 39.6273 43.1446 39.9402C42.99 39.9787 42.8326 39.9981 42.6747 39.9981H21.1382C19.8347 39.998 18.778 38.7238 18.778 37.1519C18.778 36.9962 18.7886 36.8408 18.8096 36.6875L18.849 36.4591C20.1587 30.166 25.0737 25.506 32.0082 25.506ZM15.1736 0.310567C17.6599 1.02891 20.0214 3.44283 19.883 9.11217L19.8634 9.63658C19.7957 9.76201 20.7236 10.2743 20.7236 11.9235C20.7236 13.023 20.4369 13.7713 19.8634 14.1685C18.8126 19.693 16.6234 22.4553 13.2959 22.4553C9.96836 22.4553 7.58711 19.693 6.15213 14.1685C5.61301 13.8836 5.34346 13.1352 5.34346 11.9235C5.34346 10.7118 5.61301 9.94951 6.15213 9.63658C6.20949 5.05517 7.07509 2.43991 8.74893 1.79079C9.41336 1.53473 10.042 1.53473 10.6348 1.79079C11.2344 0.102993 12.7473 -0.390416 15.1736 0.310567ZM39.5138 4.76256C41.1819 8.22348 41.4916 12.4509 40.4427 17.4449C40.3666 17.9634 40.6414 18.3797 41.2669 18.6938L41.3488 18.7314L41.4515 18.7724C41.6833 18.8599 41.8125 19.1575 41.7399 19.4371C41.7193 19.5164 41.6837 19.5883 41.6364 19.6473L41.5571 19.7255C40.5244 20.5219 37.5447 20.5808 35.8158 20.1681C34.6732 21.6388 33.4243 22.3741 32.0691 22.3741C30.7139 22.3741 29.4512 21.6388 28.2809 20.1681C25.0072 19.8531 23.3703 16.8952 23.3703 11.2945C23.3703 6.16711 25.0783 2.79722 28.4944 1.18487C29.0834 0.90689 29.73 0.860113 30.3423 1.05119L30.7956 1.19265C33.9661 -1.19131 36.8722 -0.00133879 39.5138 4.76256Z" fill="black"/>
                        </svg>
                    </div>
                </div>

                {/* Blocks Below Button */}
                <div className="blocks-container">
                    {userInfoData.map((data, index) => (
                        <div className="block" key={index}>
                            <div className="block-text-container">
                                <span className="block-text">{data.label}</span>
                            </div>
                            <div className="block-info-container">
                                <span className="block-info">{data.info}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
  };
  
  export default UserInfoPage;