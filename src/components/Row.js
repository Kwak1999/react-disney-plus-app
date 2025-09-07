import React, {useCallback, useEffect, useState} from "react";
import axios from "../api/axios";
import "./Row.css"
import MovieModal from "./MovieModal/MovieModal";

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
        <div>
            <h2>{title}</h2>
            {/* 영화 포스터를 좌우로 스크롤하는 슬라이더 섹션 */}
            <div className="slider">
                <div className="slider__arrow-left">
                    {/* 왼쪽 화살표 클릭 시 슬라이더를 왼쪽으로 스크롤 */}
                    <span className="arrow"
                          onClick={() => {
                              document.getElementById(id).scrollLeft -= window.innerWidth - 80
                          }}>
                        {"<"}
                    </span>
                </div>
                {/* 각 영화 포스터를 담는 컨테이너 */}
                <div id={id} className="row__posters">
                    {/* `movies` 배열을 순회하며 각 영화의 포스터를 렌더링 */}
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            className="row__poster"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={movie.name}
                            // 클릭 시 `handleClick` 함수를 호출하여 모달을 열고 데이터를 설정
                            onClick={() => handleClick(movie)}

                        />
                    ))}
                </div>
                <div className="slider__arrow-right">
                    {/* 오른쪽 화살표 클릭 시 슬라이더를 오른쪽으로 스크롤 */}
                    <span className="arrow"
                          onClick={() => {
                              document.getElementById(id).scrollLeft += window.innerWidth - 80
                          }}>
                        {">"}
                    </span>
                </div>
            </div>

            {/* `modalOpen` 상태가 true일 때만 `MovieModal` 컴포넌트를 렌더링 */}
            {modalOpen &&
                <MovieModal
                    // 선택된 영화 데이터를 props로 전달
                    {...movieSelected}
                    // 모달을 닫는 함수를 props로 전달
                    setModalOpen={setModalOpen}
                />
            }
        </div>
    )
}

export default Row;