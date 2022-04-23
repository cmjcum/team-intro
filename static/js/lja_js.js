$(document).ready(function () {
            randomMbti()
            show_comment()
        })

        const MBTI = [
                ['E', 'I'],
                ['S', 'N'],
                ['T', 'F'],
                ['J', 'P']
            ]
        const myMBTI = 'INFP'

        function randomMbti() {
            for (let i=0; i<4; i++) {
                let curButton = '#mbtiButton' + i
                let rand = Math.floor(Math.random()*2) //0<= 랜덤 <2
                if(rand == 0)
                    $(curButton).text(MBTI[i][0])
                else
                    $(curButton).text(MBTI[i][1])
            }
        }

        function mbtiButtonClick(btn) {
            let curButton = '#mbtiButton' + btn
            let curMbti = $(curButton).text()
            $(curButton).blur()
            if(curMbti == MBTI[btn][0])
                $(curButton).text(MBTI[btn][1])
            else
                $(curButton).text(MBTI[btn][0])
        }

        function answerButton() {
            let answer = ''
            for (let i=0; i<4; i++) {
                let curButton = '#mbtiButton' + i
                answer += $(curButton).text()
                $(curButton).attr('disabled', true)
                $(curButton).css('font-weight', 'bold')
                $(curButton).text(myMBTI[i])
            }
            $('#mbtiButton4').hide()

            if(myMBTI == answer)
                alert('😍정답입니다!😍')
            else
                alert('틀렸습니다! 제 MBTI는 INFP예요😝')

            let temp_html = `<p>
                                저는 인프피! 다른 것들은 거의 중립인데<br>
                                I는 좀 치우쳐져 있어요😂<br>
                                낯을 가린다고 느껴질 수도 있지만<br>
                                친구들한테 웃기다는 얘기 많이 들어요! 친해져요😌<br>
                            </p>`
            $('#myIntro').append(temp_html)
        }

        function toggleButton(btn) {
            $('#displayStrengthWork').empty()
            let temp_html = ``
            if(btn == 0) {
               temp_html = `<div class="msg-card" id="msg-card">
                        <div class="card">
                            <div class="card-body">
                                팀원들을 잘 챙겨주는 믿음직한 팀장님 - 김동근
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                문제를 해결하기 위해 인터넷의 바다를 해치며 방법을 찾아오는 서치 능력👍 - 노을
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                팀원들을 위해 항상 발벗고 도와주는 모습이 멋있습니당! 특히 긍정적인 멘트를 자주 쓰셔서 다른 사람의 마음을 좀 더 편안하게 해주셔요🥰 - 이현경
                            </div>
                        </div>
                    </div>`
            }
            else {
                temp_html = `<p>1. 최대한 많이 소통하려고 한다.</p>
                            <p>2. 긍정적이고 정확한 피드백을 주고자 한다.</p>
                            <p>3. 문제가 생기면 빨리 알린다.</p>`
            }
            $('#displayStrengthWork').append(temp_html)
        }

        function save_comment() {
            let nickname = $('#name').val()
            let comment = $('#comment').val()

            $.ajax({
                type: 'POST',
                url: '/lja/comment',
                data: {nickname_give: nickname, comment_give: comment},
                success: function (response) {
                    alert(response['msg'])
                    window.location.reload()
                }
            })
        }

        function show_comment() {
            $('#comment-list').empty()
            $.ajax({
                type: "GET",
                url: "/lja/comment",
                data: {},
                success: function (response) {
                    let rows = response['guestbook']

                    for (let i=0; i<rows.length; i++) {
                        let nickname = rows[i]['nickname']
                        let comment = rows[i]['comment']

                        let temp_html = `<tr>
                                            <td>${nickname}</td>
                                            <td>${comment}</td>
                                        </tr>`

                        $('#comments-list').append(temp_html)
                    }
                }
            });
        }