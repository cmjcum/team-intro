from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:####@cluster0.gsb7w.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbCMJIntro

############### 이정아 ###############
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/lja')
def goLja():
    return render_template('lja.html')

@app.route("/lja/comment", methods=["POST"])
def lja_post():
    nickname = request.form['nickname_give']
    comment = request.form['comment_give']

    doc = {
        'nickname': nickname,
        'comment': comment
    }

    db.lja.insert_one(doc)

    return jsonify({'msg':'저장 완료!'})

@app.route("/lja/comment", methods=["GET"])
def lja_get():
    guestbookList = list(db.lja.find({}, {'_id': False}))
    return jsonify({'guestbook': guestbookList})

############### 이현경 ###############
@app.route('/lhk')
def goLhk():
    return render_template('lhk.html')

@app.route("/lhk/comment", methods=["POST"])
def lhk_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']

    all_comments = list(db.lhk.find({}, {'_id': False}))
    cnt = len(all_comments) + 1

    doc = {
        'num': cnt,
        'name': name_receive,
        'comment': comment_receive
    }
    db.lhk.insert_one(doc)

    return jsonify({'msg':'발도장 찍기 완료!'})

@app.route("/lhk/comment", methods=["GET"])
def lhk_get():
    all_comments = list(db.lhk.find({}, {'_id': False}))
    return jsonify({'guest_book': all_comments})

############### 김동근 ###############
@app.route('/kdk')
def goKdk():
    return render_template('kdk.html')

@app.route("/kdk/comment", methods=["POST"])
def kdk_post():
    nickname = request.form['nickname_give']
    comment = request.form['comment_give']

    doc = {
        'nickname': nickname,
        'comment': comment
    }

    db.kdk.insert_one(doc)

    return jsonify({'msg':'저장 완료!'})

@app.route("/kdk/comment", methods=["GET"])
def kdk_get():
    guestbookList = list(db.kdk.find({}, {'_id': False}))
    return jsonify({'guestbook': guestbookList})

############### 노을 ###############
@app.route('/sunset')
def goSunset():
    return render_template('ne.html')

@app.route("/sunset/comment", methods=["POST"])
def sunset_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']

    all_comments = list(db.sunset.find({}, {'_id': False}))
    cnt = len(all_comments) + 1

    doc = {
        'num': cnt,
        'name': name_receive,
        'comment': comment_receive
    }

    db.sunset.insert_one(doc)
    return jsonify({'msg':'메시지를 보냈습니다!'})

@app.route("/sunset/comment", methods=["GET"])
def sunset_get():
    all_comments = list(db.sunset.find({}, {'_id': False}))
    return jsonify({'guest_book': all_comments})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)