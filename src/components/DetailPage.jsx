import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon, StarIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import DefaultBanner from '../assets/default-banner.jpg'
import GifLoading from './GifLoading'

function DetailPage() {
  let { slug, episode } = useParams()
  const navigate = useNavigate()
  const [dataAnime, setDataAnime] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [dataEpisodes, setDataEpisodes] = useState([])
  const loadData = async (theSlug) => {
    setIsLoading(true)
    try {
      const res = await axios.get('https://anichi-api.vercel.app/tserver/anime/' + theSlug)
      setDataAnime(res.data)
      setDataEpisodes(res.data.episodes)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (slug) {
      loadData(slug)
    }
  }, [slug])

  const goToWatch = (slug) => {
    navigate(`/watch/${slug}`)
  }

  const searchEpisode = (text) => {
    if (text) {
      const filtered = dataAnime.episodes.filter((item) => item.slug.includes(text))
      setDataEpisodes(filtered)
    } else {
      setDataEpisodes(dataAnime.episodes)
    }
  }

  return (
    <>
      {isLoading ? (
        <GifLoading />
      ) : (
        <>
          <div className="absolute top-0 left-0 lg:-left-1 max-h-[35vh] lg:h-[350px] w-full overflow-hidden linear-mask-image">
            <img
              className="h-[35vh] lg:h-[350px] w-full object-cover"
              src={dataAnime?.banner ? dataAnime?.banner : DefaultBanner}
              alt="banner"
            />
          </div>
          <div className="section z-20 relative" id="detail-page">
            <div className="flex flex-col gap-4 items-center lg:flex-row lg:gap-8 lg:items-start">
              <div className="w-full lg:w-1/4 flex items-center justify-center lg:items-start lg:justify-start">
                <div className="bg-cover w-[200px] h-[280px] -mt-6 lg:w-[270px] lg:h-[360px] p-5 lg:mt-4 bg-light-70 rounded-xl circle-mask-image flex justify-center z-20">
                  <img
                    className="rounded-xl w-[180px] h-[240px] lg:w-[220px] lg:h-[320px]"
                    src={dataAnime?.cover}
                    alt="cover"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-2 lg:pt-9">
                <div className="flex gap-5 protest justify-between lg:justify-normal">
                  <button
                    className="btn hover:shadow-secondary bg-secondary text-white shadow-lg shadow-secondary/60"
                    onClick={() =>
                      goToWatch(
                        dataAnime?.episode?.first?.slug,
                        dataAnime?.episode?.first?.episode,
                        dataAnime?.episode?.first?.subepisode
                      )
                    }
                  >
                    Episode Pertama
                  </button>
                  <button
                    className="btn hover:shadow-secondary bg-secondary text-white shadow-lg shadow-secondary/60"
                    onClick={() =>
                      goToWatch(
                        dataAnime?.episode?.last?.slug,
                        dataAnime?.episode?.last?.episode,
                        dataAnime?.episode?.last?.subepisode
                      )
                    }
                  >
                    Episode Terakhir
                  </button>
                </div>
                <div className="w-full z-10 pt-6  rounded-xl flex flex-col ">
                  <h2 className="title-shadow text-dark text-2xl lg:text-4xl takota mb-3 tracking-widest lg:pl-0 text-center lg:text-left">
                    {dataAnime?.info?.judul}
                  </h2>
                  <div className="overflow-auto hidden lg:flex mb-3 mx-2 lg:-mx-1 lg:mb-0 mt-1 lg:max-h-[200px]">
                    <p className="text-sm px-3 py-3 lg:py-0 lg:px-2 lg:text-base text-justify text-dark">
                      {dataAnime?.synopsis?.length > 0
                        ? dataAnime?.synopsis?.map((el) => <p className="mb-1">{el}</p>)
                        : 'Belum ada sinopsis untuk anime ini.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:mt-8 gap-8">
              <div className="w-full lg:w-1/2 flex-col gap-8 ">
                <div className="p-4 bg-light">
                  <h2 className="text-xl lg:text-3xl takota tracking-widest mb-4 text-center lg:text-left hidden lg:flex">
                    Details{' '}
                    {dataAnime?.info?.judul?.split(' ').length > 4 ? (
                      <>
                        {dataAnime?.info?.judul?.split(' ').slice(0, 4).join(' ')}
                        <span className="text-secondary font-bold">...</span>
                      </>
                    ) : (
                      dataAnime?.info?.judul
                    )}{' '}
                  </h2>
                  <table className="text-sm lg:text-base">
                    <tr>
                      <td className="text-nowrap align-top">Judul</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.judul ? dataAnime?.info?.judul : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Japanese</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.japanese ? dataAnime?.info?.japanese : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Skor</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold flex items-center">
                        {dataAnime?.info?.skor ? (
                          <>
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                            {` ${dataAnime?.info?.skor}`}
                          </>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Produser</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.produser ? dataAnime?.info?.produser : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Tipe</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.tipe ? dataAnime?.info?.tipe : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Status</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.status ? dataAnime?.info?.status : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Total Episode</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.total_episode ? dataAnime?.info?.total_episode : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Durasi</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.durasi ? dataAnime?.info?.durasi : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Tanggal Rilis</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.tanggal_rilis ? dataAnime?.info?.tanggal_rilis : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Studio</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.studio ? dataAnime?.info?.studio : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-nowrap align-top">Genre</td>
                      <td className="px-2 text-secondary align-top">:</td>
                      <td className="font-semibold">
                        {dataAnime?.info?.genre ? dataAnime?.info?.genre : '-'}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4 ">
                <h2 className="text-xl lg:text-3xl takota mb-4 tracking-widest text-center lg:text-left">
                  Episode List
                </h2>
                <div className="mb-2">
                  <input
                    className="input-search-eps"
                    type="text"
                    placeholder="Cari Episode"
                    onKeyUp={(e) => searchEpisode(e.currentTarget.value)}
                  />
                </div>
                <div className="max-h-[320px] lg:max-h-[300px] overflow-auto flex flex-col gap-2 pr-2">
                  {dataEpisodes.length === 0 ? (
                    <div className="w-full py-2 px-2 rounded-md text-nowrap flex items-center cursor-pointer pl-2 shadow-md shadow-secondary/70 pl-4 bg-secondary text-light transition-all duration-200 ease-out text-sm lg:text-base protest tracking-wide">
                      Episode tidak tersedia
                    </div>
                  ) : (
                    ''
                  )}
                  {dataEpisodes?.map((el, i) => (
                    <div
                      key={i}
                      className="w-full py-2 px-2 rounded-md text-nowrap flex items-center cursor-pointer pl-2 text-secondary bg-secondary/5 hover:shadow-md hover:shadow-secondary/70 hover:pl-4 hover:bg-secondary hover:text-light transition-all duration-200 ease-out text-sm lg:text-base protest tracking-wide"
                      onClick={() => goToWatch(el.slug)}
                    >
                      {el.title
                        ?.replace(dataAnime?.info?.judul, '')
                        .replace('Subtitle Indonesia', '')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full p-4 block lg:hidden">
              <h2 className="text-xl lg:text-3xl takota mb-4 tracking-widest text-center lg:text-left">
                Sinopsis
              </h2>
              <p className="text-sm text-justify text-dark">
                {dataAnime?.synopsis?.length > 0
                  ? dataAnime?.synopsis?.map((el) => <p className="mb-1">{el}</p>)
                  : 'Belum ada sinopsis untuk anime ini.'}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DetailPage
