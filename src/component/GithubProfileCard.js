import React, { useState } from 'react';
import './GithubProfileCard.css'

const GithubProfileCard = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Go to Fetch API in git hub get the endpoint  and Use the GitHub API to fetch user data based on the entered username
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
    //If responece ok the  covert in json form
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        // Handle the case where the user was not found
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <main>
        <section className=" container">
        <div className="title">
          <h2>Github Profile Card</h2>
          <div className="underline"></div>
        </div>
      <form onSubmit={handleSubmit}>
      <div className="form-control">
      <label>
      <input type="text" value={username} onChange={handleChange} id="grocery" placeholder="UserName" />
      </label>
          
          <button type="submit" className="submit-btn">submit</button>
        </div>
       
      </form>
      {userData && (
        <article className="review">
        <div className="img-container">
        <img src={userData.avatar_url} id="person-img" alt="Avatar" />
          </div>
          
          <h3 id='author'>{userData.login}</h3>
          <p id='name'>Name: {userData.name}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <p>Public Gists: {userData.public_gists}</p>
          <p>Profile Created At: {new Date(userData.created_at).toLocaleDateString()}</p>
        </article>
      )}
    </section>
    </main>
    
  );
};

export default GithubProfileCard;
