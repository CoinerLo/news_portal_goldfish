import React, { useEffect, useState } from 'react';
import NewsPage from '../components/NewsPage';

const NewsContainer = React.memo(() => {
    const [news, setNews] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(data => setNews(data.posts))
    }, []);

    return <NewsPage news={news} />
})

export default NewsContainer;
