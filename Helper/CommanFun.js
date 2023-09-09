

const DeleteFun=async(data,modal,res,req)=>{
   try {
       const { id, userId } = data;

       // Find the group by its ID
       const group = await modal.findById(id);

       // Check if the group exists
       if (!group) {
         return res.status(404).json({ error: `chemical not found` });
       }
       await group.deleteOne();

       return res
         .status(200)
         .json({ message: `chemical deleted successfully` });
     } catch (error) {
       console.error(`Error deleting chemical :`, error);
       return res.status(500).json({ error: "Internal server error" });
     }
}

module.exports =  DeleteFun ;