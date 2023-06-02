import './Header.css';
import VideoUrl from './images/273037371_244189977769330_1669456168005052107_n.mp4'
function Header()
{
    // const videoUrl = './images/273037371_244189977769330_1669456168005052107_n.mp4';


    return (
        <div className='header_parent'>
           <div className='video_container'>
                <video controls className='video'>
                    <source src={VideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
           </div>

           <div className='chat_container'>
                <form>
                    <input type='text' name='chat' placeholder='Type a message...'/> 
                    <button>Send</button>
                </form>

           </div>
           
        </div>
    );
}

export default Header;


