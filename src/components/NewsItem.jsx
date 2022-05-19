
const NewsItem = ({ newItem }) => {

    return (
        <section className="card w-25" style={{height: "10%"}}>
                <div className="d-flex flex-column justify-content-between align-items-center card-body" style={{height: "10%"}}>
                    <h5 className="card-title">{newItem.title}</h5>
                    <p className="h-50 overflow-hidden">{newItem.body}</p>
                    <button href='#' className="btn btn-primary align-self-end w-50">Читать</button>
                </div>
        </section>
    );
}

export default NewsItem;
