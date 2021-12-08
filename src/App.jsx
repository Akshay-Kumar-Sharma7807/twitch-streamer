import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  var [streamers, setStreamers] = useState([
    // {
    //   status: "online",
    //   name: "FreeCodeCamp",
    //   url: "http://aks-games.netlify.app",
    //   logo: "https://i.ibb.co/wssW9Bn/IMG-20210415-183520.jpg",
    //   description: "hello this is description",
    //   game: "GTA V",

    // }
  ]);
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  function makeURL(type, name) {
    return 'https://twitch-proxy.freecodecamp.rocks/twitch-api/' + type + '/' + name;
  };

  useEffect(() => {
    channels.map(channel => {
      Axios.get(makeURL("streams", channel))
        .then(res => {
          console.log(res.data)
          if (res.data.stream == null) {
            Axios.get(makeURL("channels", channel))
              .then(data => {
                console.log(data)
                setStreamers(prev => {
                  return [...prev, {
                    name: data.data.display_name,
                    game: "Offline",
                    status: "offline",
                    logo: data.data.logo,
                    url: data.data.url,
                    description: ""
                  }]
                })
              })
          }
          else {
            setStreamers(prev => {
              return [...prev, {
                status: "online",
                // logo: res.data.stream.channel.logo,
                url: res.data.stream.channel.url,
                name: res.data.stream.channel.display_name,
                description: " : " + res.data.stream.channel.status,
                game: res.data.stream?.game,
                logo: res.data.stream.channel.logo
              }]
            })
          }
        })
    })
  }, [])

  return (
    <div className="App">
      <main className="App-main">
        <section class="list">
          <h1 class="heading">Twitch Streamers</h1>
          {
            streamers.length ?
              streamers.map(stream => {
                return <a href={stream.url} class={stream.status + " list-item"}>
                  <div className="img">
                    <img src={stream.logo} alt={stream.name} />
                  </div>
                  <div className="text">
                    <div className="name">
                      {stream.name}
                    </div>
                    <div className="game">
                      {stream.game}
                      <span className="description">
                        {stream.description}
                      </span>
                    </div>
                  </div>
                </a>
              })
              : <h1>nothing</h1>
          }
        </section>
      </main>
    </div>
  )
}

export default App
