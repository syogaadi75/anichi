import { PlayCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Popular({ data }) {
    const navigate = useNavigate()
    const encodeUrl = (slug) => {
        return btoa(slug)
    }

    const setContent = (animes) => {
        return animes.map((anime, index) => {
            return (
                <div key={index} className="w-full flex flex-row gap-4 items-center group cursor-pointer" onClick={() => navigate('/anime/'+encodeUrl(anime.slug))}>
                    <div className='w-[10%] lg:w-[9%]'>
                        <div className='px-4 text-sm lg:text-base text-white py-2 text-center bg-secondary rounded font-semibold protest'>{index+1}</div>
                    </div>
                    <div className="w-[20%] lg:w-[21%] relative overflow-hidden rounded-md">
                        <img src={anime.cover} alt={anime.title} className="w-full h-[100px] rounded-md object-cover group-hover:scale-110 transition-all" />
                        <div className='w-full h-[100px] absolute bg-dark/70 top-0 z-10 hidden group-hover:flex transition-all'>
                            <PlayCircleIcon className="w-12 h-12 text-red-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="w-[70%]">
                        <h3 className="text-sm font-bold mb-1">{anime.title}</h3>
                        <p className="text-xs mb-2">{anime.genres.map((el, i) => (
                            <span key={i}>{el.text}{anime.genres.length === i+1 ? '' : ', '}</span>
                        ))}</p>
                        <div className='flex items-center gap-2'>
                            <StarIcon className="w-5 h-5 text-yellow-400" />
                            <span className="text-xs font-semibold">{anime.rating ? anime.rating : '-'}</span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Weekly</Tab>
                    <Tab>Monthly</Tab>
                    <Tab>All</Tab>
                </TabList>

                <TabPanel>
                    <div className='flex flex-col gap-4'>
                        {setContent(data.weekly)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='flex flex-col gap-4'>
                        {setContent(data.monthly)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='flex flex-col gap-4'>
                        {setContent(data.alltime)}
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default Popular