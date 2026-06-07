// StarRating.jsx — renders filled/empty stars based on a numeric rating
function StarRating({ rating, max = 5 }) {
  return (
    <div className="stars" aria-label={`Rating: ${rating} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating)
        const half = !filled && i < rating

        return (
          <span key={i} className={`star ${filled || half ? '' : 'empty'}`}>
            {filled ? '★' : half ? '½' : '★'}
          </span>
        )
      })}
    </div>
  )
}

export default StarRating
