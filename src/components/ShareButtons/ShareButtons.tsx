 'use client'
 import React, { useMemo, useCallback } from 'react'
 import styles from './ShareButtons.module.css'

 type DoctorShare = {
   _id: string
   firstName: string
   lastName: string
   designation?: string
   service?: string[]
   about?: string
   profileImage?: { signedUrl?: string }
 }

 interface Props {
   doctor: DoctorShare
   profileUrl: string
   availableText?: string
 }

 export default function ShareButtons({ doctor, profileUrl, availableText }: Props) {
   const name = `Dr. ${doctor.firstName} ${doctor.lastName}`
   const specialty = doctor.service?.[0] || doctor.designation || ''
   const bio = (doctor.about || '').replace(/\s+/g, ' ').trim().slice(0, 180)
   const image = doctor.profileImage?.signedUrl || `${new URL(profileUrl).origin}/placeholder-doctor.png`
   const title = `${name}${specialty ? ' – ' + specialty : ''}`
   const description = `${availableText ? availableText + ' · ' : ''}${bio}`
   const encodedUrl = encodeURIComponent(profileUrl)
   const encodedTitle = encodeURIComponent(title)
   const encodedDesc = encodeURIComponent(description)
   const encodedText = encodeURIComponent(`${title}\n${description}\n${profileUrl}`)
   
   const links = useMemo(() => ({
     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}%20${encodedDesc}`,
     linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
     whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
     messengerWeb: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=6628568379&redirect_uri=${encodedUrl}`,
     messengerDeep: `fb-messenger://share?link=${encodedUrl}`,
     viber: `viber://forward?text=${encodedText}`
   }), [encodedUrl, encodedTitle, encodedDesc, encodedText])
 
   const onMessengerClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
     const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
     const href = isMobile ? links.messengerDeep : links.messengerWeb
     ;(e.currentTarget as HTMLAnchorElement).href = href
   }, [links])
 
   const onNativeShare = useCallback(async () => {
     if (navigator.share) {
       try {
         await navigator.share({ title, text: `${title}\n${description}`, url: profileUrl })
       } catch {}
     } else {
       try {
         await navigator.clipboard.writeText(profileUrl)
         alert('Link copied')
       } catch {}
     }
   }, [title, description, profileUrl])
 
  return (
    <div className={styles.shareRow}>
      <a className={`${styles.btn} ${styles.fb}`} href={links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">Facebook</a>
      <a className={`${styles.btn} ${styles.li}`} href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">LinkedIn</a>
      <a className={`${styles.btn} ${styles.wa}`} href={links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">WhatsApp</a>
      <a className={`${styles.btn} ${styles.ms}`} href={links.messengerWeb} onClick={onMessengerClick} target="_blank" rel="noopener noreferrer" aria-label="Share on Messenger">Messenger</a>
      <a className={`${styles.btn} ${styles.vi}`} href={links.viber} target="_blank" rel="noopener noreferrer" aria-label="Share on Viber">Viber</a>
      <button className={`${styles.btn} ${styles.og}`} onClick={onNativeShare} aria-label="Share via device">Share</button>
    </div>
  )
}
