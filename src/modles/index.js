import auth from "./auth";
import home from "./home";

const models = [
    auth,
    home,
];
/**
 * 初始化模型
 * @param DvaApp dva实例
 */
const initModels = DvaApp => {
    models.map((m)=>{
        DvaApp.model(m)
    })
};

export default initModels
