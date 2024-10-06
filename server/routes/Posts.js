const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của bài viết
 *         title:
 *           type: string
 *           description: Tiêu đề bài viết
 *         content:
 *           type: string
 *           description: Nội dung bài viết
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lấy danh sách tất cả bài viết
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Danh sách tất cả bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  res.json(listOfPosts);
});

/**
 * @swagger
 * /posts/byId/{id}:
 *   get:
 *     summary: Lấy thông tin bài viết theo ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của bài viết
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Tạo bài viết mới
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Bài viết đã được tạo thành công
 *       400:
 *         description: Lỗi yêu cầu
 */
router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;