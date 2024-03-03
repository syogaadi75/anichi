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
  const loadData = async (theSlug) => {
    setIsLoading(true)
    try {
      const res = await axios.get('https://anichi-api.vercel.app/tserver/anime/' + theSlug)
      setDataAnime(res.data)
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

  return (
    <>
      {isLoading ? (
        <GifLoading />
      ) : (
        <>
          <div className="absolute top-0 left-0 lg:-left-1 max-h-[35vh] lg:h-[350px] w-full overflow-hidden">
            <img
              className="h-[35vh] lg:h-[350px] w-full object-cover"
              src={dataAnime?.banner ? dataAnime?.banner : DefaultBanner}
              alt="banner"
            />
          </div>
          <div className="section z-20 relative" id="detail-page">
            <div className="flex flex-col gap-4 items-center lg:flex-row lg:gap-8 lg:items-end">
              <div className="w-full lg:w-1/4 flex items-center justify-center lg:items-start lg:justify-start">
                <div className="bg-cover w-[200px] h-[280px] -mt-6 lg:w-[270px] lg:h-[360px] p-5 lg:mt-4 bg-light-70 backdrop-blur rounded-xl shadow-2xl shadow-dark/10 flex justify-center z-20">
                  <img
                    className="rounded-xl w-[180px] h-[240px] lg:w-[220px] lg:h-[320px]"
                    src={dataAnime?.cover}
                    alt="cover"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-4">
                <div className="flex gap-5 protest">
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
                <div className="w-full max-h-[380px] z-10 pt-6 bg-light/70 shadow-2xl shadow-dark/10 rounded-xl backdrop-blur flex flex-col lg:pt-8 lg:p-6 lg:h-[260px]">
                  <h2 className="text-2xl px-3 lg:px-2 protest mb-2 lg:mb-4 text-dark drop-shadow shadow-secondary">
                    {dataAnime?.info?.judul}
                  </h2>
                  <div className="overflow-scroll mb-3 mx-2 lg:mx-0 lg:mb-0">
                    <p className="text-sm px-3 py-3 lg:py-0 lg:px-2 lg:text-base text-justify">
                      {dataAnime?.synopsis?.length > 0
                        ? dataAnime?.synopsis?.map((el) => <p className="mb-1">{el}</p>)
                        : 'Belum ada sinopsis untuk anime ini.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start mt-8 gap-8">
              <div className="w-full lg:w-1/2 flex-col gap-8 order-2 lg:order-1">
                <div className="p-4 bg-light shadow-2xl shadow-dark/10 text-sm">
                  <table>
                    <tr>
                      <td>Judul</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.judul}</td>
                    </tr>
                    <tr>
                      <td>Japanese</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.japanese}</td>
                    </tr>
                    <tr>
                      <td>Skor</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />{' '}
                        {dataAnime?.info?.skor}
                      </td>
                    </tr>
                    <tr>
                      <td>Produser</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.produser}</td>
                    </tr>
                    <tr>
                      <td className="text-nowrap">Tipe</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.tipe}</td>
                    </tr>
                    <tr>
                      <td className="text-nowrap">Status</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.status}</td>
                    </tr>
                    <tr>
                      <td className="text-nowrap">Total Episode</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.total_episode}</td>
                    </tr>
                    <tr>
                      <td className="text-nowrap">Durasi</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.durasi}</td>
                    </tr>
                    <tr>
                      <td className="text-nowrap">Tanggal Rilis</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.tanggal_rilis}</td>
                    </tr>
                    <tr>
                      <td className="text-nowrap">Studio</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.studio}</td>
                    </tr>
                    <tr>
                      <td className="text-nowrap">Genre</td>
                      <td className="px-2 text-secondary">:</td>
                      <td className="font-semibold">{dataAnime?.info?.genre}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="w-full p-6 bg-light shadow-2xl shadow-dark/10 order-1 lg:order-2">
                <h2 className="text-xl protest mb-4">List Episode</h2>
                <div className="max-h-[500px] overflow-scroll">
                  {dataAnime?.episodes?.map((el, i) => (
                    <div
                      key={i}
                      className="w-full h-[40px] text-nowrap flex items-center border-b border-secondary cursor-pointer hover:pl-4 hover:bg-secondary hover:text-light transition-all duration-200 ease-out"
                      onClick={() => goToWatch(el.slug)}
                    >
                      {el.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DetailPage
