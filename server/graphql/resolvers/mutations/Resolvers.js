import JobModel from "../../../models/JobModel.js"
import UserModel from "../../../models/UserModel.js"

export const authenticateUserResolver = (fbID, name, picture, email) => {
    return UserModel.findOne({ fbID: args.fbID }, (err, data) => {
        const user = {
            fbID: fbID,
            name: name,
            picture: picture,
            bio: '',
            upvotes: [],
            downvotes: [],
            email: email,
            createdAt: Date.now(),
        }

        if (data === null) {
            UserModel.create(user)
        }
        return UserModel.findOne({ fbID: fbID })
    })
}

export const getUserResolver = (fbID) => {
    return UserModel.findOne({ fbID: fbID })
}

export const editBioResolver = (fbID, bio) => {
    UserModel.updateOne({ fbID: fbID }, { bio: bio }).then(res => console.log(res))
    return UserModel.findOne({ fbID: fbID })
}

export const addPostResolver = (title, description, authorid, picture) => {
    const post = {
        title: title,
        description: description,
        authorid: authorid,
        date: Date.now(),
        status: "Available",
        picture: picture
    }

    let createdPostId = '';
    return JobModel.create(post).then(data => {
        createdPostId = data._id

        return JobModel.findOne({ _id: createdPostId })
    })
}

export const getPostResolver = () => {
    return JobModel.find({})
}


export const deletePostResolver = (jobId) => {
    return JobModel.deleteOne({ _id: jobId })
}

export const requestWorkResolver = (userId, userName, jobId) => {
    return JobModel.findById(jobId, (err, data) => {
        if (data !== null) {
            const previoseWorkRequests = data.requests

            //removes woker
            if (previoseWorkRequests.filter((worker) => worker.fbID === userId,).length >= 1) {
                const newWorkRequests = previoseWorkRequests.filter((worker) => worker.fbID !== userId,)
                return JobModel.updateOne({ _id: jobId }, { requests: newWorkRequests }, () => {
                    console.log('removed')
                })
            }
            //adds woker
            else {
                const newWorkRequests = [...previoseWorkRequests, { jobId: jobId, fbID: userId, name: userName },]
                return JobModel.updateOne({ _id: jobId }, { requests: newWorkRequests }, () => {
                    console.log('added')
                })
            }
        }
    })
}