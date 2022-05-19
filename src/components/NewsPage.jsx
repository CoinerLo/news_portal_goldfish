import NewsItem from './NewsItem';

const NewsPage = ({ news }) => {
    
    return (
        <main className="h-100 d-flex flex-column align-content-center text-center">
            <h1 className="h1 mt-5">Все новости в одном месте!</h1>
            <div className="d-flex flex-wrap mt-4 container">
                {news
                    ? news.map((item => <NewsItem newItem={item} key={item.id} />))
                    : <h5>Ой, кажется закончились новости!</h5>
                }
            </div>
        </main>
    )
}

export default NewsPage;
