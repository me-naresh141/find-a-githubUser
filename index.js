let profileImg = document.querySelector('.profile-img')
let input = document.querySelector('input')
let name = document.querySelector('h2')
let small = document.querySelector('small')
let followerUl = document.querySelector('.follower-ul')
let followingUL = document.querySelector('.following-ul')
let followerheading = document.querySelector('.follower-heading')
let followingheading = document.querySelector('.following-heading')
let followerlidiv = document.querySelector('.follower-li-div')
let followinglidiv = document.querySelector('.following-li-div')
let allimage = document.querySelectorAll('img')
allimage.forEach((im) => {
  im.addEventListener('click', () => {
    let defaltImg = new SpeechSynthesisUtterance()
    defaltImg.text = im.alt
    window.speechSynthesis.speak(defaltImg)
  })
})
// cat
let catDiv = document.querySelector('.cat-div')
let catImage = document.querySelector('.catImage')
let button = document.querySelector('button')

function handleDisplay(data) {
  profileImg.src = data.avatar_url
  profileImg.alt = data.name
  name.innerText = data.name
  small.innerText = '@' + data.login
  profileImg.addEventListener('click', () => {
    let pro = new SpeechSynthesisUtterance()
    pro.text = profileImg.alt
    window.speechSynthesis.speak(pro)
  })
}

let xhr = new XMLHttpRequest()
function handleInput(e) {
  if (e.keyCode === 13) {
    xhr.open('GET', `https://api.github.com/users/${input.value}`)
    xhr.onload = function () {
      handleDisplay(JSON.parse(xhr.response))

      // followers

      let followers = new XMLHttpRequest()
      followers.open(
        'GET',
        `https://api.github.com/users/${input.value}/followers`,
      )
      followers.onload = function () {
        let followerData = JSON.parse(followers.response)
        followerlidiv.innerHTML = ''
        for (let i = 0; 5 > i; i++) {
          let li = document.createElement('li')
          let img = document.createElement('img')
          img.src = followerData[i].avatar_url
          img.alt = followerData[i].login

          img.alt = followerData[i].login
          li.append(img)
          followerlidiv.append(li)
          followerUl.append(followerlidiv)
          //

          img.addEventListener('click', () => {
            let spe = new SpeechSynthesisUtterance()
            spe.text = img.alt
            window.speechSynthesis.speak(spe)
          })
        }
      }
      followers.send()

      // following

      let followingData = new XMLHttpRequest()
      followingData.open(
        'GET',
        `https://api.github.com/users/${input.value}/following`,
      )
      followingData.onload = function () {
        followinglidiv.innerHTML = ''
        let followingImg = JSON.parse(followingData.response)
        for (let j = 0; 5 > j; j++) {
          let li = document.createElement('li')
          let img = document.createElement('img')
          img.src = followingImg[j].avatar_url
          img.alt = followingImg[j].login
          li.append(img)
          console.log(li)
          followinglidiv.append(li)
          followingUL.append(followinglidiv)

          //
          img.addEventListener('click', () => {
            let follo = new SpeechSynthesisUtterance()
            follo.text = img.alt
            window.speechSynthesis.speak(follo)
          })
        }
      }
      followingData.send()
      input.value = ''
    }
    xhr.send()
  }
}

input.addEventListener('keyup', handleInput)

// cat

button.addEventListener('click', () => {
  let cimg = new XMLHttpRequest()
  cimg.open('GET', 'https://api.thecatapi.com/v1/images/search')
  cimg.onload = function () {
    let catData = JSON.parse(cimg.response)
    let randomImage = catData[0].url
    catImage.src = randomImage
    catDiv.append(catImage)
  }
  cimg.send()
})
