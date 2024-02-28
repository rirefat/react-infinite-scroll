
const Card = ({ product }) => {
    const {title, thumbnail, description} = product;

    return (
        <div className="card card-compact w-72 bg-base-100 shadow-xl">
            <figure><img src={thumbnail} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Card;