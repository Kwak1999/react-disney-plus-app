import React, {useEffect, useRef, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
// import {useDebounce} from "../hook/useDebounce";

const Nav = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname, search } = location;

    const initialUserData = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : {};

    const [userData, setUserData] = useState(initialUserData);
    const [show, setShow] = useState(false);

    // ✅ URL 초기 q만 반영(마운트 시 1회)
    const [searchValue, setSearchValue] = useState(() => {
        return new URLSearchParams(search).get('q') || '';
    });

    // ✅ IME(한글) 조합 상태
    const [isComposing, setIsComposing] = useState(false);

    // ✅ 우리가 보낸 navigate 인지 표시
    const selfNavRef = useRef(false);

    const inputRef = useRef(null);

    // ✅ 외부 내비게이션(뒤/앞/딥링크)일 때만 URL → state 동기화
    useEffect(() => {
        if (selfNavRef.current) {
            selfNavRef.current = false; // 내부 내비게이션은 무시
            return;
        }
        const q = new URLSearchParams(location.search).get('q') || '';
        setSearchValue(q);
    }, [location.search]);

    // ✅ /search 에서만 자동 포커스
    useEffect(() => {
        if (pathname.startsWith('/search') && inputRef.current && document.activeElement !== inputRef.current) {
            inputRef.current.focus();
        }
    }, [pathname]);

    // ✅ 스크롤 배경 처리
    useEffect(() => {
        const handleScroll = () => setShow(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ✅ 인증 상태 변화
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (pathname === '/') navigate('/main');
            } else {
                navigate('/');
            }
        });
        return () => unsub();
    }, [auth, navigate, pathname]);

    const updateURL = (value) => {
        selfNavRef.current = true;
        navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
    };

    // ✅ 실시간 입력: IME 조합 중이 아닐 때만 URL 반영
    const handleChange = (e) => {
        const next = e.target.value;
        setSearchValue(next);
        if (!isComposing) updateURL(next);
    };

    const handleCompositionStart = () => setIsComposing(true);

    const handleCompositionEnd = (e) => {
        setIsComposing(false);
        const next = e.currentTarget.value; // 확정된 문자열
        setSearchValue(next);
        updateURL(next); // 조합 종료 시 1회 반영
    };

    const handleAuth = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUserData(result.user);
                localStorage.setItem('userData', JSON.stringify(result.user));
            })
            .catch(console.log);
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUserData({});
                navigate(`/`);
            })
            .catch(console.log);
    };

    return (
        <NavWrapper show={show}>
            <Logo>
                <img
                    alt="Disney Plus Logo"
                    src="/images/logo.svg"
                    onClick={() => (window.location.href = '/')}
                />
            </Logo>

            {pathname === '/' ? (
                <Login onClick={handleAuth}>Login</Login>
            ) : (
                <>
                    <Input
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChange}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        className="nav__input"
                        type="text"
                        placeholder="검색해주세요."
                    />

                    <SignOut>
                        <UserImg src={userData.photoURL} alt={userData.displayName} />
                        <DropDown>
                            <span onClick={handleSignOut}>Sign Out</span>
                        </DropDown>
                    </SignOut>
                </>
            )}
        </NavWrapper>
    );
};

export default Nav;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius:  4px;
    box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100%;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;

const UserImg = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
`;


const Login = styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: gray;
        border-color: transparent;
    }
`;

const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: black;
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: none;

    /* focus 시 placeholder 완전 숨기기 */
    &:focus::placeholder {
        background-color: black;
        color: black;  /* 완전 투명 */
        opacity: 1;             /* 불투명도 0 */
    }
`;

const NavWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${props => props.show ? "#090b13" : "transparent"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    padding:0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    diplay: inline-block;

    img {
        display: block;
        width: 100%;
    }
`