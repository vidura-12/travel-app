import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

function footer() {
  return (
    <div>
      
      <section class="home">
          <div class="home-box">
               <nav class="navbar">
                    <div class="logo bars">
                         <div class="bar">
                              <i class="fa fa-bars"></i>
                         </div>
                         <h3>Travel</h3>
                    </div>
                    <div class="menu">
                         <div class="close">
                              <i class="fa fa-close"></i>
                         </div>
                         <ul>
                              <li><a href="#">Home</a></li>
                              <li><a href="#">About</a></li>
                              <li><a href="#">Travel Packages</a></li>
                              <li><a href="#">Destinations</a></li>
                              <li><a href="#">Careers</a></li>
                         </ul>
                    </div>
                    <div class="login-signup">
                         <a href="#">LogIn</a>
                         <a href="#">SignUp</a>
                    </div>
               </nav>

               <div class="content">
                    <h4>Travel</h4>
                    <h1>Let's embark on your drem journey</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus sapiente aperiam aliquam alias necessitatibus quos cupiditate assumenda adipisci odio modi.</p>
                    <div class="search">
                         <i class="fa fa-search"></i>
                         <input type="text" placeholder="your journey begins with a search..."/>
                         <button>search</button>
                    </div>
               </div>
          </div>
     </section>

     <section class="travel">
          <div class="container">
               <div class="box">
                    <img src="img/tool/planning.png" alt=""/>
                    <div class="content">
                         <h4>seamless travel planning</h4>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolore quod consectetur quae beatae voluptatibus deleniti sed accusantium quam quis.</p>
                    </div>
               </div>
               <div class="box">
                    <img src="img/tool/map.png" alt=""/>
                    <div class="content">
                         <h4>toilored experiences</h4>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolore quod consectetur quae beatae voluptatibus deleniti sed accusantium quam quis.</p>
                    </div>
               </div>
               <div class="box">
                    <img src="img/tool//trust.png" alt=""/>
                    <div class="content">
                         <h4>reliable and trustworthy</h4>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolore quod consectetur quae beatae voluptatibus deleniti sed accusantium quam quis.</p>
                    </div>
               </div>
          </div>
     </section>

     <section class="destination">
          <h4 class="label">destinations</h4>
          <div class="container">
               <div class="container-box">
                    <h2 class="heading">city escape and nature retreats</h2>
                    <div class="content">
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam exercitationem necessitatibus architecto, obcaecati aut quo odio excepturi nesciunt quam quis deserunt eveniet nemo non nihil nostrum. Repellendus vel rem eaque.</p>
                         <a href="#">explore more <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
               </div>
               <div class="gallery">
                    <div class="box">
                         <img src="img/destinations/destinations-5.jpg" alt=""/>
                         <div class="text">
                              <h2>east nusa tenggara</h2>
                         </div>
                    </div>
                    <div class="box">
                         <img src="img/destinations/destinations-1.jpg" alt=""/>
                         <div class="text">
                              <h2>bali</h2>
                         </div>
                    </div>
                    <div class="box">
                         <img src="img/destinations/destinations-2.jpg" alt=""/>
                         <div class="text">
                              <h2>bali</h2>
                         </div>
                    </div>
                    <div class="box">
                         <img src="img/destinations/destinations-3.jpg" alt=""/>
                         <div class="text">
                              <h2>east java</h2>
                         </div>
                    </div>
                    <div class="box">
                         <img src="img/destinations/destinations-4.jpg" alt=""/>
                         <div class="text">
                              <h2>west papua</h2>
                         </div>
                    </div>
               </div>
          </div>
     </section>

     <section class="featured">
          <div class="gallery">
               <div class="box">
                    <div class="first-box">
                         <h4 class="label">featured offers</h4>
                         <h2 class="heading">umlock exclusive travel deals</h2>
                         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quae!</p>
                         <a href="#">show more</a>
                         <div class="image">
                              <img src="img/plane.png" alt=""/>
                         </div>
                    </div>
               </div>
               <div class="box">
                    <img src="img/featured/featured-1.jpg" alt=""/>
                    <div class="content">
                         <h2>yuliaya hotel</h2>
                         <p>gill trawangan, lombok</p>
                         <div class="review-and-usd">
                              <div class="review"><i class="fa fa-star"></i> 4.9 | 853 review</div>
                              <p>USD 3 400</p>
                         </div>
                    </div>
               </div>
               <div class="box">
                    <img src="img/featured/featured-2.jpg" alt=""/>
                    <div class="content">
                         <h2>feranndo hotel</h2>
                         <p>gill trawangan, lombok</p>
                         <div class="review-and-usd">
                              <div class="review"><i class="fa fa-star"></i> 4.9 | 853 review</div>
                              <p>USD 3 400</p>
                         </div>
                    </div>
               </div>
               <div class="box">
                    <img src="img/featured/featured-3.jpg" alt=""/>
                    <div class="content">
                         <h2>evin's hotel</h2>
                         <p>gill trawangan, lombok</p>
                         <div class="review-and-usd">
                              <div class="review"><i class="fa fa-star"></i> 4.9 | 853 review</div>
                              <p>USD 3 400</p>
                         </div>
                    </div>
               </div>
          </div>
     </section>

     <section class="feedback">
          <div class="container">
               <h4 class="label">adventure's voices</h4>
               <h2 class="heading">adventure's voices</h2>
               <p class="paragraph">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, repellendus?
               </p>
          </div>
          <div class="voices">
               <div class="voice">
                    <div class="profile">
                         <img src="img/messages/Team-04.jpg" alt=""/>
                         <div class="detail">
                              <li>ana davin</li>
                              <li>traveler</li>
                         </div>
                    </div>
                    <p>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam esse non nostrum, natus quibusdam assumenda libero"</p>
               </div>
               <div class="voice">
                    <div class="profile">
                         <img src="img/messages/Team-06.jpg" alt=""/>
                         <div class="detail">
                              <li>elsa davin</li>
                              <li>traveler</li>
                         </div>
                    </div>
                    <p>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam esse non nostrum, natus quibusdam assumenda libero"</p>
               </div>
               <div class="voice">
                    <div class="profile">
                         <img src="img/messages/Team-07.jpg" alt=""/>
                         <div class="detail">
                              <li>jony davin</li>
                              <li>traveler</li>
                         </div>
                    </div>
                    <p>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam esse non nostrum, natus quibusdam assumenda libero"</p>
               </div>
               <div class="voice">
                    <div class="profile">
                         <img src="img/messages/Team-08.jpg" alt=""/>
                         <div class="detail">
                              <li>jhon davin</li>
                              <li>traveler</li>
                         </div>
                    </div>
                    <p>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam esse non nostrum, natus quibusdam assumenda libero"</p>
               </div>
               <div class="voice">
                    <div class="profile">
                         <img src="img/messages/Team-09.jpg" alt=""/>
                         <div class="detail">
                              <li>mia davin</li>
                              <li>traveler</li>
                         </div>
                    </div>
                    <p>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam esse non nostrum, natus quibusdam assumenda libero"</p>
               </div>
               <div class="voice">
                    <div class="profile">
                         <img src="img/messages/Team-10.jpg" alt=""/>
                         <div class="detail">
                              <li>danny davin</li>
                              <li>traveler</li>
                         </div>
                    </div>
                    <p>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam esse non nostrum, natus quibusdam assumenda libero"</p>
               </div>
          </div>
     </section>

     <section class="article">
          <h4 class="label">resources</h4>
          <h2 class="heading">latest article</h2>
          <div class="container">
               <div class="latest-article">
                    <img src="img/about/hidden-game.jpg" alt=""/>
                    <p>destination descovery</p>
                    <h3>10 must-visit hidden game in southeasta asia</h3>
                    <div class="author">
                         <img src="img/messages/Team-04.jpg" alt=""/>
                         <p>ana davin - 9 min read</p>
                    </div>
               </div>
               <div class="more-article">
                    <div class="box">
                         <div class="image">
                              <img src="img/about/family.jpg" alt=""/>
                         </div>
                         <div class="text">
                              <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, assumenda!</h3>
                              <li>family travel - min read</li>
                         </div>
                    </div>
                    <div class="box">
                         <div class="image">
                              <img src="img/about/food-article.jpg" alt=""/>
                         </div>
                         <div class="text">
                              <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, assumenda!</h3>
                              <li>food and travel - min read</li>
                         </div>
                    </div>
                    <div class="box">
                         <div class="image">
                              <img src="img/about/budget-travel.jpg" alt=""/>
                         </div>
                         <div class="text">
                              <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, assumenda!</h3>
                              <li>budget travel - min read</li>
                         </div>
                    </div>
                    <div class="box">
                         <div class="image">
                              <img src="img/about/tips.jpg" alt=""/>
                         </div>
                         <div class="text">
                              <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate, assumenda!</h3>
                              <li>travel tips - min read</li>
                         </div>
                    </div>
               </div>
          </div>
     </section>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </div>
  );
}

export default footer;
