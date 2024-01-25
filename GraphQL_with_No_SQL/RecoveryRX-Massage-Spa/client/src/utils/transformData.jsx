

export function transformData(originalData) {
    return originalData.map(item => {
        return {
            title: item.title,
            description: item.description,
            image: item.image,
            price: `60min: ${item.price[0].min60} | 90min: ${item.price[0].min90}`,
            id: item._id
        };
    });
}