import "./App.css";
import React,{useContext,useEffect} from "react";
import {AppContext} from './context/AppContext';
import {Route, Routes, useLocation, useSearchParams} from 'react-router-dom';
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import BlogPage from './Pages/BlogPage';
import TagPage from './Pages/TagPage';

const App = () => {
  const { fetchBlogPosts } = useContext(AppContext);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;

    const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
    const category = location.pathname.split("/").at(-1).replaceAll("-", " ");

    if (location.pathname.includes("tags")) {
      fetchBlogPosts(Number(page), tag);
    }
    else if (location.pathname.includes("categories")) {
      fetchBlogPosts(Number(page), category);
    }
    else {
      fetchBlogPosts(Number(page));
    }

  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:blogId" element={<BlogPage />} />
      <Route path="/tags/:tag" element={<TagPage />} />
      <Route path="/categories/:category" element={<CategoryPage />} />
    </Routes>
  );
};

export default App;