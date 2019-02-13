const { Stamp } = require('../model');
const moment = require('moment');
let lock = false;

const addStamp = (req, res) => {
    let { nextId } = req.body;

    let timeStamp = Date.now();
    Stamp.findOne({ isLast: true })
        .then(result => {
            let isFirst = !result;
            let _lastId = isFirst ? 1 : result.nextId;
            if (!isFirst && result.nextId === nextId) {
                return res.json({ code: -3, error: '新项目和上一个项目不能相同' });
            } else if (!isFirst && (timeStamp - result.timeStamp < 1000 * 60)) {
                return res.json({ code: -7, error: '项目持续事件不得少于1分钟，请1分钟后重试' });
            } else {
                if (lock) return res.json({ code: -4, error: '更新失败，请稍后重试' });
                lock = true;
                Stamp.findOneAndUpdate({ isLast: true }, { isLast: false })
                    .then(result => {
                        Stamp.create({
                            timeStamp,
                            nextId,
                            lastId: _lastId,
                            isLast: true
                        }).then(result => {
                            lock = false;
                            return res.json({ code: 0, result });
                        }).catch(error => {
                            lock = false;
                            return res.json({ code: -6, error });
                        });
                    }).catch(error => {
                        lock = false;
                        return res.json({ code: -5, error });
                    });
            }
        })
        .catch(error => {
            return res.json({ code: -2, error })
        });
}

const getStamps = async (req, res) => {
    let { base, days } = req.params;
    let baseDay = moment(base);
    let sub, sup;
    if (!days) days = 0;
    if (days < 0) {
        sub = baseDay.subtract(-days, 'd').startOf('day').valueOf();
        sup = baseDay.endOf('day').valueOf();
    } else if (days === 0) {
        sub = baseDay.startOf('day').valueOf();
        sup = baseDay.endOf('day').valueOf();
    } else {
        sub = baseDay.startOf('day').valueOf();
        sup = baseDay.add(days, 'd').endOf('day').valueOf();
    }
    // 查3次，第一次查中间，第二次查小于1个，第三次查大于一个
    let subData = await Stamp.find({ timeStamp: { $lte: sub } }, {_id: 0, __v: 0}).sort({ timeStamp: -1 });
    let supData = await Stamp.find({ timeStamp: { $gte: sup } }, {_id: 0, __v: 0}).sort({ timeStamp: 1 });
    let data = await Stamp.find({ timeStamp: { $lt: sup, $gt: sub } }, {_id: 0, __v: 0});
    let latest = await Stamp.findOne({ isLast: true }, {_id: 0, __v: 0});

    res.json({ code: 0, data: {
        sub: subData[0] || null,
        sup: supData[0] || null,
        main: data,
        latest
    }});
}

module.exports = {
    addStamp,
    getStamps
}