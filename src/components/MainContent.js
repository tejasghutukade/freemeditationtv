import React,{useState, useEffect} from 'react';
import Subscribe from './Subscribe';
import axios from 'axios';
const MainComponent = ({ videos }) => {

  const [latestVideoId, setLatestVideoId] = useState('https://www.youtube.com/embed/r9D-LGl51cM');

  const getLatestVideo = async () => {
    try {
      const cid = "UC1s6Xs4OboEjVN5gPz2ldwQ";
      const channelURL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`)
      const reqURL = `https://api.rss2json.com/v1/api.json?api_key=nk3iox7gnvybbyvvgotcxqz2s3vap4wxqbbge3a4&rss_url=${channelURL}`;

      console.log('Fetching latest video from:', reqURL);
      const response = await axios.get(reqURL);
      console.log('RSS2JSON API response:', response.data);
      
      let shortVideos = [];
      try {
        shortVideos = await getShortsList();
        console.log('Shorts list:', shortVideos);
      } catch (shortsError) {
        console.error('Error fetching shorts list:', shortsError);
        // Continue with empty shorts list
      }
  
      const youtubeVideos = response.data.items;
      const firstNonShortVideo = youtubeVideos.find(video => !shortVideos.includes(video.link.substr(video.link.indexOf("=") + 1)));
      const latestVideo_Id = firstNonShortVideo.link.substr(firstNonShortVideo.link.indexOf("=") + 1);   
      console.log('Latest video ID:', latestVideo_Id); 
      return latestVideo_Id;
    } catch (error) {
      console.error('Error in getLatestVideo:', error);
      // Return a default video ID in case of error
      return 'r9D-LGl51cM';
    }
  };

  const getShortsList = async () => {
    try {
      const reqURL = `https://yt.lemnoslife.com/channels?part=shorts&id=UC1s6Xs4OboEjVN5gPz2ldwQ`;
      console.log('Fetching shorts from:', reqURL);
      
      const response = await axios.get(reqURL);    
      console.log('Shorts API response:', response.data);
      
      const shorts = response.data.items[0].shorts;
      const videoIds = await shorts.map(short => short.videoId);
      return videoIds;    
    } catch (error) {
      console.error('Error in getShortsList:', error);
      throw error; // Re-throw to handle in getLatestVideo
    }
  }

    useEffect(() => {
      getLatestVideo().then((latestVideoLink) => {
        setLatestVideoId('https://www.youtube.com/embed/'+latestVideoLink);
      });
    });


    return (      
      <main className="container max-w-6xl mx-auto p-4">
        {/* Row for Video and Content */}
        <div className="flex flex-wrap -mx-2 pt-10">
          {/* Video Column */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="aspect-w-16 aspect-h-12">
            <iframe
                className="w-full aspect-video"
                src={latestVideoId}
                title="Featured Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>             
            </div>
          </div>
  
          {/* Content Column */}
          <div className="w-full md:w-1/2 px-2 mb-4 flex flex-col">
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">Learn How to Meditate</h2>
              <p className="mb-4">
                For people who want to meditate more
              </p>

              <div className="md:hidden grid border border-gray-300">
                <div className="thumbnail flex flex-col border border-gray-300">              
                    <div className="flex-grow border">                
                      <a href={`https://www.youtube.com/watch?v=8bs3LqWhZ3I`} className="block overflow-hidden" target="_blank" rel="noopener noreferrer">
                        <img className="w-full object-cover" src="hqdefault.jpg" alt="Featured Video - How to fight Insomnia" />                                       
                        </a>
                    </div>      
                    <a href={`https://www.youtube.com/watch?v=8bs3LqWhZ3I`} className="block overflow-hidden" target="_blank" rel="noopener noreferrer">                          
                      <h1 className="text-md text-center text-blue-500 hover:underline">Featured Video - How to fight Insomnia</h1>
                    </a>
                </div>
              </div>
    
              <h2 className="text-2xl font-bold mb-2">Subscribe</h2>
              <p className="mb-4">
                Subscribe to our YouTube Channel and be notified of weekly videos, guided meditations with music and links to meditation opportunities.
              </p>
              <div className="mb-4">
                {/* You will need to replace this with actual subscription functionality */}
                <Subscribe></Subscribe>
              </div>
            </div>
            
          </div>
        </div>
  
        {/* Thumbnails Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-4 lg:gap-4 md:gap-3 border border-gray-300">
          {videos.map((video , index) => (
            <div key={video.id} className={video.isHiddenInMobile ? `lg:block hidden thumbnail flex flex-col border border-gray-300` : `thumbnail flex flex-col border border-gray-300 `}>              
                <div className="flex-grow border">                
                  <a href={`https://www.youtube.com/watch?v=${video.id}`} className="block overflow-hidden" target="_blank" rel="noopener noreferrer">
                    <img className="w-full object-cover" src={video.thumbnail} alt={video.title} />                                       
                    </a>
                </div>      
                <a href={`https://www.youtube.com/watch?v=${video.id}`} className="block overflow-hidden" target="_blank" rel="noopener noreferrer">                          
                  <h1 className="text-md text-center text-blue-500 hover:underline">{video.title}</h1>
                </a>
            </div>
          ))}
        </div>
      </main>
    );
  };
  
  
  
  export default MainComponent;
  