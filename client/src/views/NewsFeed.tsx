import RecipeList from "../components/recipes/RecipeList";
import RecipeDetail from "../components/recipes/DummyRecipeDetail";
import '../App.css'
import './NewsFeed.css'

export const NewsFeed = () => {
    return (
    <div className="news-feed">
        <RecipeList />
    </div>)
}