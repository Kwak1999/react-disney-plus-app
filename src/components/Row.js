import React, {useCallback, useEffect, useState} from "react";
import axios from "../api/axios";
import "./Row.css"
import MovieModal from "./MovieModal/MovieModal";
import styled from "styled-components";

import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper style
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";


// `Row` 컴포넌트는 영화 리스트를 가로로 스크롤하는 UI를 렌더링합니다.
// props로 받은 `title`, `id`, `fetchUrl`을 사용해 특정 카테고리의 영화 데이터를 가져옵니다.
const Row = ({title, id, fetchUrl}) => {
    // `useState` 훅을 사용해 컴포넌트의 상태를 관리합니다.
    const [movies, setMovies] = useState([]); // API로부터 받아온 영화 데이터 리스트
    const [modalOpen, setModalOpen] = useState(false); // 모달의 열림/닫힘 상태
    const [movieSelected, setMovieSelection] = useState({}); // 현재 선택된 영화의 데이터

    // `useCallback` 훅으로 `fetchMovieData` 함수를 메모이제이션합니다.
    // `fetchUrl`이 변경될 때만 함수를 재생성하여 불필요한 API 호출을 방지합니다.
    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        // console.log(response); // 디버깅용 로그
        setMovies(response.data.results);
    }, [fetchUrl]);

    // `useEffect` 훅을 사용해 컴포넌트가 마운트될 때, 또는 `fetchMovieData`가 변경될 때
    // 영화 데이터를 가져옵니다.
    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    // 영화 포스터를 클릭했을 때 호출되는 핸들러 함수입니다.
    // 모달을 열고, 선택된 영화의 데이터를 상태에 저장합니다.
    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelection(movie);
    }

    return (
        <Container>
            <h2>{title}</h2>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                loop={true} //loop 기능을 사용할 것인지
                navigation // arrow 버튼 사용 유무
                pagination={{ clickable: true }} //페이지 버튼 보이게 할지
                breakpoints={{
                    1378: {
                        slidesPerView: 6, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3, //한번에 보이는 슬라이드 개수
                        slidesPerGroup: 3,
                    },
                }}
            >
                <Content id={id}>
                    {movies.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <Wrap>
                                <img
                                    key={movie.id}
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    alt={movie.name}
                                    onClick={() => handleClick(movie)}
                                />
                            </Wrap>
                        </SwiperSlide>
                    ))}
                </Content>
            </Swiper>


            {modalOpen &&
                <MovieModal
                    {...movieSelected}
                    setModalOpen={setModalOpen}
                />
            }
        </Container>
    )
}

export default Row;

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div``;

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0/69%) 0px 26px 30px -10px,
              rgb(0 0 0/73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    width: 100%;
    transition: opacity 500ms ease-in-out;
    z-index:1;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
       rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;