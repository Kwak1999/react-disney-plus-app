## 검색창 포커싱 풀림 현상
- 주소 바뀔 때, 포커싱 다시 잡아주도록 수정
- ref로 감싸주기
```
    const inputRef = useRef(null);
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q") || "";
    const [searchValue, setSearchValue] = useState(query);

    useEffect(() => {
        if (inputRef.current && document.activeElement !== inputRef.current) {
            inputRef.current.focus();
        }
    }, [pathname]); // 경로 바뀔 때마다 확인
```

```
    <Input
        ref={inputRef}
        value={searchValue}
        onChange={handleChange}
        className='nav__input'
        type="text"
        placeholder='검색해주세요.'
    />
```
