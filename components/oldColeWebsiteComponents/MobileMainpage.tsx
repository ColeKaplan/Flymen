import Card from "./Card";
import Header from "./ColeHeader";
import HorizontalCard from "./HorizontalCard";

export default function MobileMainpage(){
    return (
        <div className="h-dvw min-h-screen w-dvw">
            <header className='pb-10'>
                <Header />
            </header>
            <div className='flex flex-col my-md:hidden mb-10'>
                <div id="cardsForGames" className='flex justify-center'>
                    <div className='hidden sm:block'>
                        <HorizontalCard 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Draw for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>

                    <div className='flex sm:hidden'>
                        <Card 
                        link='/games/DrawingGame'
                        image='/games/DrawingGame/Car.png'
                        title="Draw for AI"
                        text="Try to get the AI to guess the category by drawing"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='hidden sm:block'>
                        <HorizontalCard 
                        link='/games/BoyOnTheMoon'
                        image='/games/BoyMoon/BoyOnMoon.png'
                        title="BoyOnTheMoon"
                        text="3D Graphic created originally in OpenGL and converted to WebGL with Three.js"
                        />
                    </div>

                    <div className='flex sm:hidden'>
                        <Card 
                        link='/games/BoyOnTheMoon'
                        image='/games/BoyMoon/BoyOnMoon.png'
                        title="BoyOnTheMoon"
                        text="3D Graphic created originally in OpenGL and converted to WebGL with Three.js"
                        />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='hidden sm:block'>
                        <HorizontalCard 
                        link='/games/Chess'
                        image='/games/Chess/ChessImage.png'
                        title="Chess"
                        text="Play a friend or challenge our algorithm in this classic game"
                        />
                    </div>

                    <div className='flex sm:hidden'>
                        <Card 
                        link='/games/Chess'
                        image='/games/Chess/ChessImage.png'
                        title="Chess"
                        text="Play a friend or challenge our algorithm in this classic game"
                        />
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='hidden sm:block'>
                        <HorizontalCard 
                        link='/games/Footprints'
                        image='/games/Footprints/Footprints.png'
                        title="Footprints"
                        text="AR project using Snap Spectacles. Winner at MIT Reality Hack 2025!"
                        />
                    </div>

                    <div className='flex sm:hidden'>
                        <Card 
                        link='/games/Footprints'
                        image='/games/Footprints/Footprints.png'
                        title="Footprints"
                        text="AR project using Snap Spectacles. Winner at MIT Reality Hack 2025!"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}