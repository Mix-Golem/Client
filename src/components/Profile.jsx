// import React from 'react'
// import styled from 'styled-components'
// import { Theme } from '../styles/Theme'

// import noticeIcon from '../img/notice.png'
// import GuideLogo from '../img/GuideLogo.png'
// function Profile() {

//     function handleGuideClick(){
//         window.location.href = "/Guide";
//     }
//   return (
//     <FieldWrapper>
//         <GuideGIcon onClick={handleGuideClick}/>
//         <NoticeIcon/>
//     </FieldWrapper>
//   )
// }

// export default Profile

// const FieldWrapper = styled.div`
//     top: 47px;
//     position: absolute;
//     left: 1695px;
//     z-index: 2;
//     justify-content: center;
//     align-items: center;
//     display: flex;
//     width: 175px;
//     height: 70px;
//     gap: 20px;
//     border-radius: 70px;
//     background: ${Theme.colors.lightBlue};
// `

// const GuideGIcon = styled.div`
//     width: 50px;
//     height: 50px;
//     background: url(${GuideLogo}) center ;
//     cursor: pointer;
// `

// const NoticeIcon = styled.div`
//     width: 50px;
//     height: 50px;
//     background: url(${noticeIcon}) center ;
//     cursor: pointer;
// `

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Theme } from '../styles/Theme'
import axios from 'axios'
import { Axios } from '../api/Axios'
import Cookies from 'js-cookie';
import { format } from 'date-fns'

import noticeIcon from '../img/notice.png'
import GuideLogo from '../img/GuideLogo.png'

function Profile() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('token') // Assuming token is stored in localStorage
      const response = await Axios.get('/users/notice', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.data.isSuccess) {
        setNotifications(response.data.result)
      } else {
        console.error('Failed to fetch notifications')
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNoticeClick = () => {
    if (!showNotifications) {
      fetchNotifications()
    }
    setShowNotifications(!showNotifications)
  }

  function handleGuideClick() {
    // window.location.href = "/Guide"
  }

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = new Date(notification.createdAt)
    const formattedDate = format(date, 'yyyy.MM.dd') // Format: 2024.01.01
    
    if (!groups[formattedDate]) {
      groups[formattedDate] = []
    }
    
    groups[formattedDate].push(notification)
    return groups
  }, {})

  return (
    <FieldWrapper>
      <GuideGIcon onClick={handleGuideClick} />
      <NoticeIconContainer ref={dropdownRef}>
        <NoticeIcon onClick={handleNoticeClick} />
        
        {showNotifications && (
          <NotificationsDropdown>
            {loading ? (
              <LoadingText>알림 로딩 중...</LoadingText>
            ) : notifications.length === 0 ? (
              <NoNotifications>알림이 없습니다</NoNotifications>
            ) : (
              Object.entries(groupedNotifications).map(([date, notifs]) => (
                <NotificationGroup key={date}>
                  <DateHeader>
                    <DateLabel>{date}</DateLabel>
                  </DateHeader>
                  {notifs.map((notification, index) => (
                    <NotificationItem key={notification.id || index} read={notification.read === 1}>
                      <NotificationContent>
                        {notification.notificationType === 'FOLLOW' ? '매칭명 - ' : '매칭명 - '}
                        {notification.contents}
                      </NotificationContent>
                      <NotificationTime>
                        {format(new Date(notification.createdAt), 'HH:mm')}
                      </NotificationTime>
                    </NotificationItem>
                  ))}
                </NotificationGroup>
              ))
            )}
          </NotificationsDropdown>
        )}
      </NoticeIconContainer>
    </FieldWrapper>
  )
}

export default Profile

const FieldWrapper = styled.div`
  top: 47px;
  position: absolute;
  left: 1695px;
  z-index: 2;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 175px;
  height: 70px;
  gap: 20px;
  border-radius: 70px;
  background: ${Theme.colors.lightBlue};
`

const GuideGIcon = styled.div`
  width: 50px;
  height: 50px;
  background: url(${GuideLogo}) center;
  cursor: pointer;
`

const NoticeIconContainer = styled.div`
  position: relative;
`

const NoticeIcon = styled.div`
  width: 50px;
  height: 50px;
  background: url(${noticeIcon}) center;
  cursor: pointer;
`

const NotificationsDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: ${Theme.colors.black || 'black'};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  color: ${Theme.colors.white};
  font-weight: 900;
`

const NotificationGroup = styled.div`
  border-bottom: 1px solid #eee;
`

const DateHeader = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
`

const DateLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #666;
  text-align: center;
`

const NotificationItem = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.read ? 'transparent' : 'rgba(0, 123, 255, 0.05)'};
  
  &:last-child {
    border-bottom: none;
  }
`

const NotificationContent = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`

const NotificationTime = styled.div`
  font-size: 12px;
  color: #888;
  align-self: flex-end;
`

const LoadingText = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`

const NoNotifications = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`