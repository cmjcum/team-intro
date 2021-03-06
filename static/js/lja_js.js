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
                let rand = Math.floor(Math.random()*2) //0<= λλ€ <2
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
                alert('πμ λ΅μλλ€!π')
            else
                alert('νλ Έμ΅λλ€! μ  MBTIλ INFPμμπ')

            let temp_html = `<p>
                                μ λ μΈννΌ! λ€λ₯Έ κ²λ€μ κ±°μ μ€λ¦½μΈλ°<br>
                                Iλ μ’ μΉμ°μ³μ Έ μμ΄μπ<br>
                                λ―μ κ°λ¦°λ€κ³  λκ»΄μ§ μλ μμ§λ§<br>
                                μΉκ΅¬λ€νν μκΈ°λ€λ μκΈ° λ§μ΄ λ€μ΄μ! μΉν΄μ Έμπ<br>
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
                                νμλ€μ μ μ±κ²¨μ£Όλ λ―Ώμμ§ν νμ₯λ - κΉλκ·Ό
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                λ¬Έμ λ₯Ό ν΄κ²°νκΈ° μν΄ μΈν°λ·μ λ°λ€λ₯Ό ν΄μΉλ©° λ°©λ²μ μ°Ύμμ€λ μμΉ λ₯λ ₯π - λΈμ
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                νμλ€μ μν΄ ν­μ λ°λ²κ³  λμμ£Όλ λͺ¨μ΅μ΄ λ©μμ΅λλΉ! νΉν κΈμ μ μΈ λ©νΈλ₯Ό μμ£Ό μ°μμ λ€λ₯Έ μ¬λμ λ§μμ μ’ λ νΈμνκ² ν΄μ£Όμμπ₯° - μ΄νκ²½
                            </div>
                        </div>
                    </div>`
            }
            else {
                temp_html = `<p>1. μ΅λν λ§μ΄ μν΅νλ €κ³  νλ€.</p>
                            <p>2. κΈμ μ μ΄κ³  μ νν νΌλλ°±μ μ£Όκ³ μ νλ€.</p>
                            <p>3. λ¬Έμ κ° μκΈ°λ©΄ λΉ¨λ¦¬ μλ¦°λ€.</p>`
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