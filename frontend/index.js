async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`


  const getAllh3 = () => document.querySelectorAll('.h3')
  //Bringing in the data from the URL's
  let urlA = 'http://localhost:3003/api/learners'
  let urlB = 'http://localhost:3003/api/mentors'
  let resA = axios.get(urlA)
  let resB = axios.get(urlB)

  Promise.all([resA, resB])
    .then(res => {
      document.querySelector('.info').textContent = 'No learner is selected'

      //Bringing the two endpoints data together into array of objects
      let studentList = res[0].data
      let mentorList = res[1].data

      let idArray =[]
      mentorList.forEach(mentor => {
        idArray.push(mentor.id)
      })

      let studentArray = []
      
      studentList.forEach(student => {
        let mentorNames = []
        
        student.mentors.forEach(mentor => {
          let findIndex = idArray.indexOf(mentor)
          mentorNames.push(`${mentorList[findIndex].firstName} ${mentorList[findIndex].lastName}`)
        })

        let studentObj = {id: student.id, fullName: student.fullName, email: student.email, mentorName: mentorNames}
        studentArray.push(studentObj)
      })
        
        let container = document.querySelector('.cards')

        //Creating + Adding Card
        studentArray.forEach((student, i) => {
          let card = document.createElement('div')
          let nameIdCard = document.createElement('h3')
          let emailCard = document.createElement('div')
          let mentorsDropCard = document.createElement('h4')
          let mentorsListCard = document.createElement('ul')

          const { id, fullName, email, mentorName } = student
          nameIdCard.textContent = fullName
          emailCard.textContent = email
          mentorsDropCard.textContent = 'Mentors'

          mentorName.forEach(mentor => {
            let mentorListItem = document.createElement('li')
            mentorListItem.textContent = mentor
            mentorsListCard.appendChild(mentorListItem)
          })

          card.classList.add('card')
          mentorsDropCard.classList.add('closed')
          
          card.appendChild(nameIdCard)
          card.appendChild(emailCard)
          card.appendChild(mentorsDropCard)
          card.appendChild(mentorsListCard)
          container.appendChild(card)

          card.addEventListener('click', evt => {
            let selected = document.querySelector('.selected')
            
            if(selected) {
              //console.log('selected')
              if (card.classList.contains('selected')) {
                //console.log('same card')
                card.classList.remove('selected')
                nameIdCard.textContent = `${fullName}`

                document.querySelector('.info').textContent = 'No learner is selected'
              } else{
                //console.log('not same card')
                console.log(card)
                console.log(selected)
                // if (document.querySelectorAll('.selected').length === 1) {
                  
                // }
                card.firstChild.textContent = fullName
                selected.classList.remove('selected')
                card.classList.add('selected')
                nameIdCard.textContent = `${fullName}, ID ${id}`

                document.querySelector('.info').textContent = `The selected learner is ${fullName}`
              }
            } else {
              //console.log('not selected')
              card.classList.add('selected')
              nameIdCard.textContent = `${fullName}, ID ${id}`

              document.querySelector('.info').textContent = `The selected learner is ${fullName}`
            }
          })

          mentorsDropCard.addEventListener('click', evt => {
            
            if (mentorsDropCard.classList.contains('open') && card.classList.contains('selected')) {
              evt.stopPropagation()
              mentorsDropCard.classList.remove('open')
              mentorsDropCard.classList.add('closed')
            } else if (mentorsDropCard.classList.contains('open')) {
              mentorsDropCard.classList.remove('open')
              mentorsDropCard.classList.add('closed')
            } else if (mentorsDropCard.classList.contains('closed') && card.classList.contains('selected')){
              evt.stopPropagation()
              mentorsDropCard.classList.remove('closed')
              mentorsDropCard.classList.add('open')
            } else {
              mentorsDropCard.classList.remove('closed')
              mentorsDropCard.classList.add('open')
            }
          })
        })

      })
      



  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
